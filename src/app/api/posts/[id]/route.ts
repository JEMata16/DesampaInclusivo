import { eq, inArray } from "drizzle-orm";
import { db } from "~/server/db";
import { files, posts, postsToFiles } from "~/server/db/schema";
import * as https from "https";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { NodeHttpHandler } from "@smithy/node-http-handler";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Readable } from "stream";
import { generateSignedUrls } from "~/utils/s3-filemanagment";
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
  signedUrl: string | null;
};

type Post = {
  id: number;
  description: string;
  provincia: string;
  canton: string;
  rating: number;
  authorId: string;
  username: string;
  createdAt: Date;
  updatedAt: Date | string;
  images: Image[];
};

export async function GET(
  req: Request,
   {params}:  { params: { id: string } },
) {
  const { id } = await params;
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
      return NextResponse.json({ posts: [] }, { status: 200 });
    }

    const user = await clerkClient().users.getUser(userId);
    const username = user?.username || "Unknown";

    // Transform result into Post structure
    const post: Post = {
      id: result[0]!.posts.id,
      description: result[0]!.posts.description ?? '',
      provincia: result[0]!.posts.provincia ?? '',
      canton: result[0]!.posts.canton ?? '',
      rating: result[0]!.posts.rating ?? 0,
      authorId: result[0]!.posts.authorId ?? '',
      createdAt: result[0]!.posts.createdAt ?? '',
      updatedAt: result[0]!.posts.updatedAt ?? '',
      username,
      images: result.map((row) => ({
        fileName: row.files.fileName,
        originalName: row.files.originalName,
        size: row.files.size,
        signedUrl: null, // Placeholder
      })),
    };
    post.images = await generateSignedUrls(post.images);
    return NextResponse.json(
      { posts: [post] },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("GET error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const postId = parseInt(params.id, 10);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Post ID inválido" }, { status: 400 });
    }

    const formData = await request.formData();
    const userId = request.headers.get("userId");
    const file = formData.get("file") as File | null;

    if (!userId) {
      return NextResponse.json(
        { error: "No se detecto el usuario" },
        { status: 400 },
      );
    }

    const { canton, provincia, rating, descripcion } =
      Object.fromEntries(formData);

    // Update post data
    const updateResult = await db
      .update(posts)
      .set({
        description: descripcion?.toString() || undefined,
        rating: rating ? Number(rating) : undefined,
        canton: canton?.toString() || undefined,
        provincia: provincia?.toString() || undefined,
      })
      .where(eq(posts.id, postId));

    if (!updateResult) {
      return NextResponse.json(
        { error: "Fallo al actualizar el post" },
        { status: 500 },
      );
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
        .where(eq(postsToFiles.postsId, postId));
    }

    return NextResponse.json(
      { message: "Post actualizado exitosamente!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error actualizando el post:", error);
    return NextResponse.json(
      { error: "Fallo al actualizar el post" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const postId = parseInt(params.id, 10);

    if (isNaN(postId)) {
      return NextResponse.json(
        { error: "Invalid post ID" },
        { status: 400 }, // Bad Request
      );
    }

    const userId = request.headers.get("userId");
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }, // Bad Request
      );
    }

    // Fetch files associated with the post
    const filesToDelete = await db
      .select({
        id: files.id,
        bucket: files.bucket,
        fileName: files.fileName,
      })
      .from(files)
      .innerJoin(postsToFiles, eq(files.id, postsToFiles.filesId))
      .where(eq(postsToFiles.postsId, postId));

    // Delete the objects from MinIO
    for (const file of filesToDelete) {
      try {
        const command = {
          Bucket: file.bucket,
          Key: file.fileName,
        };
        await s3Client.send(new DeleteObjectCommand(command));
      } catch (error) {
        console.error(`Failed to delete object ${file.fileName}:`, error);
      }
    }

    // Delete associations in postsToFiles
    await db.delete(postsToFiles).where(eq(postsToFiles.postsId, postId));

    // Delete files metadata
    await db.delete(files).where(
      inArray(
        files.id,
        filesToDelete.map((file) => file.id),
      ),
    );

    // Finally, delete the post
    await db.delete(posts).where(eq(posts.id, postId));

    return NextResponse.json(
      { message: "Post and associated files deleted successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting the post:", error);
    return NextResponse.json(
      { error: "Failed to delete the post" },
      { status: 500 },
    );
  }
}
