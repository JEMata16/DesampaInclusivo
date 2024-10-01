import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { files, posts, postsToFiles } from "~/server/db/schema";
import * as https from "https";
import { GetObjectCommand, GetObjectCommandInput, S3Client } from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import { NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth, clerkClient } from "@clerk/nextjs/server";
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
}

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
}

type Data = {
  posts: Post[];
}

export async function GET(
  req: any,
  {
    params: { userId },
  }: {
    params: { userId: string };
  },
) {
  // Fetch posts con sus archivos asociados
  const result = await db.select({
    posts: posts,
    files: files,
  })
    .from(posts)
    .innerJoin(postsToFiles, eq(posts.id, postsToFiles.postsId))
    .innerJoin(files, eq(files.id, postsToFiles.filesId))
    .where(eq(posts.authorId, userId));


  if (!result || result.length === 0) {
    return NextResponse.json({ posts: [], files: [] }, { status: 200 });
  }

  const { username } = await clerkClient().users.getUser(userId);
  
  // Agrupar los archivos por postId
  const postsWithImages = result.reduce((acc: any, row: any) => {
    const postId = row.posts.id;

    // Inicializar el post si no existe en el objeto acumulado
    if (!acc[postId]) {
      acc[postId] = {
        ...row.posts,
        authorId: username,
        images: [],
      };
    }

    // Añadir la informacion de archivo a cada post
    acc[postId].images.push({
      fileName: row.files.fileName,
      originalName: row.files.originalName,
      bucket: row.files.bucket,
      size: row.files.size,
    });

    return acc;
  }, {});

  // Generar URLs de imagen
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
          { expiresIn: 3600 }
        );
        post.images[i].signedUrl = signedUrl;
      } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ posts: Object.values(postsWithImages)}, { status: 200 });
}
