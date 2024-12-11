import { desc, eq } from "drizzle-orm";
import { db } from "~/server/db";
import { files, posts, postsToFiles } from "~/server/db/schema";
import * as https from "https";
import {
  GetObjectCommand,
  GetObjectCommandInput,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import { NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Readable } from "stream";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const httpAgent = new https.Agent({
  rejectUnauthorized: false,
});

const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
  forcePathStyle: true,
  tls: false,
  requestHandler: new NodeHttpHandler({
    httpAgent,
  }),
});

type Image = {
  fileName: string;
  originalName: string;
  size: number;
  signedUrl: string;
};

type Post = {
  id: number;
  description: string;
  provincia: string;
  canton: string;
  rating: number;
  authorId: string;
  createdAt: string;
  updatedAt: string | null;
  images: Image[];
};

export async function GET(
  req: any
) {
  try {
    // Fetch all posts
    const result = await db
      .select({
        posts: posts,
        files: files,
      }).from(posts)
      .innerJoin(postsToFiles, eq(posts.id, postsToFiles.postsId))
      .innerJoin(files, eq(files.id, postsToFiles.filesId))
      .orderBy(desc(posts.createdAt));
      

    if (!result || result.length === 0) {
      return NextResponse.json({ posts: [], files: [] }, { status: 200 });
    }


    const postsWithImages: any = {};

    for (const row of result) {
      const postId = row.posts.id;
      const userId = row.posts.authorId!;
    
      if (!postsWithImages[postId]) {
        const { username } = await clerkClient().users.getUser(userId);
        postsWithImages[postId] = {
          ...row.posts,
          username: username,
          images: [],
        };
      }
    
      postsWithImages[postId].images.push({
        fileName: row.files.fileName,
        originalName: row.files.originalName,
        bucket: row.files.bucket,
        size: row.files.size,
      });
    }


    // Generate image signed URLs
    for (const postId in postsWithImages) {
      const post = postsWithImages[postId];
      for (let i = 0; i < post.images.length; i++) {
        const image = post.images[i];
        const command: GetObjectCommandInput = {
          Bucket: image.bucket,
          Key: image.fileName,
        };

        try {
          const signedUrl = await getSignedUrl(
            s3Client as any,
            new GetObjectCommand(command) as any,
            { expiresIn: 3600 },
          );
          post.images[i].signedUrl = signedUrl;
        } catch (error: any) {
          console.error("Error generating signed URL:", error.message);
          post.images[i].signedUrl = null; // Add a fallback for failed URLs
        }
      }
    }

    return NextResponse.json(
      { posts: Object.values(postsWithImages) },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("GET error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}