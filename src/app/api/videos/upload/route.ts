import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@smithy/node-http-handler";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Readable } from "stream";
import * as https from "https";
import { files, videos } from "~/server/db/schema";
import { db } from "~/server/db";
import { use } from "react";

type FormData = {
  title: string;
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
  const { has } = auth();
  const userId = request.headers.get("userId");

  if (!(has({ role: "org:muni" }) || !has({ role: "org:admin" }))) {
    return NextResponse.json(
      { error: "No tienes permiso para subir videos" },
      { status: 403 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No se recibio el archivo" },
        { status: 400 },
      );
    }

    const { title } = Object.fromEntries(formData) as FormData;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length > 16 * 1024 * 1024) {
      return NextResponse.json(
        { error: "El archivo supera el límite de 16MB permitido." },
        { status: 400 }
      );
    }

    const stream = Readable.from(buffer);

    const command = new PutObjectCommand({
      Bucket: "desampainclusivo",
      Key: title,
      Body: stream,
      ContentType: file.type || "video/mp4",
      ContentLength: buffer.length,
      ACL: "public-read",
    });

    await s3Client.send(command);

    const insertedFile = await db
      .insert(files)
      .values({
        bucket: "desampainclusivo",
        fileName: title,
        originalName: file.name,
        size: file.size,
        authorId: userId,
      })
      .returning({ id: files.id });

    if (!insertedFile || !insertedFile[0]) {
      throw new Error("File insertion failed, no ID returned.");
    }

    const fileId = insertedFile[0].id;

    const insertedVideo = await db
      .insert(videos)
      .values({
        title: title,
        mediaId: fileId,
      })
      .returning({ id: videos.id });

    if (!insertedVideo || !insertedVideo[0]) {
      throw new Error("Fallo al registrar el vídeo");
    }

    return NextResponse.json({ message: "Vídeo subido exitosamente" });
  } catch (error) {
    console.error("Error en la base de datos:", error);
    return NextResponse.json(
      { error: "Fallo al registrar el vídeo" },
      { status: 500 },
    );
  }
}