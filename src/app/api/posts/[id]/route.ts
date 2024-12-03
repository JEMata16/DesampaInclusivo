import { eq } from "drizzle-orm";
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
  req: Request,
  { params: { id } }: { params: { id: string; } },
) {
  try {
    const postId = parseInt(id, 10);
    if (isNaN(postId)) {
      return NextResponse.json(
        { error: "Invalid post ID" },
        { status: 400 }, // Bad Request
      );
    }

    const userId = req.headers.get("userId");
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }, // Bad Request
      );
    }

    // Fetch posts based on the postId
    const result = await db
      .select({
        posts: posts,
        files: files,
      })
      .from(posts)
      .innerJoin(postsToFiles, eq(posts.id, postsToFiles.postsId))
      .innerJoin(files, eq(files.id, postsToFiles.filesId))
      .where(eq(posts.id, postId));

    if (!result || result.length === 0) {
      return NextResponse.json({ posts: [], files: [] }, { status: 200 });
    }

    const user = await clerkClient().users.getUser(userId);
    const username = user?.username || "Unknown";

    // Group files by postId
    const postsWithImages = result.reduce((acc: any, row: any) => {
      const postId = row.posts.id;

      if (!acc[postId]) {
        acc[postId] = {
          ...row.posts,
          authorId: username,
          images: [],
        };
      }

      acc[postId].images.push({
        fileName: row.files.fileName,
        originalName: row.files.originalName,
        bucket: row.files.bucket,
        size: row.files.size,
      });

      return acc;
    }, {});

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

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
      const postId = parseInt(params.id, 10);
  
      if (isNaN(postId)) {
        return NextResponse.json({ error: "Post ID inválido" }, { status: 400 });
      }
  
      const formData = await request.formData();
      const userId = request.headers.get("userId");
      const file = formData.get("file") as File | null;
  
      if (!userId) {
        return NextResponse.json({ error: "No se detecto el usuario" }, { status: 400 });
      }
  
      const { canton, provincia, rating, descripcion } = Object.fromEntries(formData);
  
      // Update post data
      const updateResult = await db
        .update(posts)
        .set({
          description: descripcion?.toString() || undefined,
          rating: rating ? Number(rating) : undefined,
          canton: canton?.toString() || undefined,
          provincia: provincia?.toString() || undefined,
        })
        .where(eq(posts.id,postId));
  
      if (!updateResult) {
        return NextResponse.json({ error: "Fallo al actualizar el post" }, { status: 500 });
      }
  
      if (file) {
        // Process the new file
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const stream = Readable.from(buffer);
  
        const command = new PutObjectCommand({
          Bucket: "desampainclusivo",
          Key: `${file.name}`,
          Body: stream,
          ContentType: file.type,
          ContentLength: buffer.length,
        });
  
        await s3Client.send(command);
  
        // Insert new file metadata
        const insertedFile = await db
          .insert(files)
          .values({
            bucket: "desampainclusivo",
            fileName: file.name,
            originalName: file.name,
            size: file.size,
            authorId: userId,
          })
          .returning({ id: files.id });
  
        if (!insertedFile || !insertedFile[0]) {
          throw new Error("Failed to insert file metadata");
        }
  
        const newFileId = insertedFile[0].id;
  
        // Update the relationship in postsToFiles table
        await db
          .update(postsToFiles)
          .set({ filesId: newFileId })
          .where(eq(postsToFiles.postsId,postId));
      }
  
      return NextResponse.json({ message: "Post actualizado exitosamente!" }, { status: 200 });
    } catch (error) {
      console.error("Error actualizando el post:", error);
      return NextResponse.json({ error: "Fallo al actualizar el post" }, { status: 500 });
    }
  }