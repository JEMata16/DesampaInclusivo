import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import * as https from "https";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import { db } from "~/server/db";
import { capacitaciones, files } from "~/server/db/schema";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

type FormData = {
  name: string;
  description: string;
  link?: string;
  date: string; //ISO Format
  time: string;
  file: File;
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

    const { name, description, link, date, time } = Object.fromEntries(
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

      // Insert into capacitaciones table and get the inserted capc ID
      const insertedCapacitacion = await db
        .insert(capacitaciones)
        .values({
          name,
          description,
          link,
          date: new Date(date),
          time,
          mediaId: fileId,
        })

      if (!insertedCapacitacion || !insertedCapacitacion[0]) {
        throw new Error("Error al subir el post");
      }


    } catch (error) {
      console.error(error);
    }

    return NextResponse.json({ message: "Capacitación subida exitosamente!" });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 },
    );
  }
}
