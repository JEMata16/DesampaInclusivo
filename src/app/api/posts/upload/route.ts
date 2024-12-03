import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import * as https from "https";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import { db } from "~/server/db";
import { files, posts, postsToFiles } from "~/server/db/schema";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

type FormData = {
  file: File;
  provincia: string;
  canton?: string;
  rating: string;
  descripcion: string;
};

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

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const userId = request.headers.get("userId");

    if (!file) {
      return NextResponse.json(
        { error: "No se recibio el archivo" },
        { status: 400 },
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "No se detecto el usuario" },
        { status: 400 },
      );
    }

    const { canton, provincia, rating, descripcion } = Object.fromEntries(
      formData,
    ) as FormData;

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
    try {
      // Insert into posts table and get the inserted post ID
      const insertedPost = await db
        .insert(posts)
        .values({
          description: descripcion,
          rating: Number(rating),
          authorId: userId,
          canton: canton,
          provincia: provincia,
        })
        .returning({ id: posts.id }); // Ensure you return the inserted post's ID

      if (!insertedPost || !insertedPost[0]) {
        throw new Error("Error al subir el post");
      }

      const postId = insertedPost[0].id; // Access the post ID

      // Insert into files table and get the inserted file ID
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
        throw new Error("File insertion failed, no ID returned.");
      }

      const fileId = insertedFile[0].id; // Access the file ID

      // Insert into the postsMedia (postsToFiles) table to establish the relationship
      await db.insert(postsToFiles).values({
        postsId: postId,
        filesId: fileId,
      });
    } catch (error) {
      console.error(error);
    }

    return NextResponse.json({ message: "File uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 },
    );
  }
}
