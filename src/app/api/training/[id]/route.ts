import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { capacitaciones, files } from "~/server/db/schema";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
  forcePathStyle: true,
});

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const result = await db.query.capacitaciones.findFirst({
      where: eq(capacitaciones.id, id),
      with: {
        file: true,
      },
    });

    if (!result) {
      return NextResponse.json({ error: "Capacitación no encontrada" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching capacitación:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    // First fetch capacitación + file
    const cap = await db.query.capacitaciones.findFirst({
      where: eq(capacitaciones.id, id),
      with: { file: true },
    });

    if (!cap) {
      return NextResponse.json({ error: "Capacitación no encontrada" }, { status: 404 });
    }

    // Delete capacitación
    await db.delete(capacitaciones).where(eq(capacitaciones.id, id));

    // Optional: delete associated file from DB + S3
    if (cap.file) {
      // Delete from DB
      await db.delete(files).where(eq(files.id, cap.file.id));

      // Delete from S3
      try {
        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: cap.file.bucket,
            Key: cap.file.fileName,
          })
        );
      } catch (s3Error) {
        console.error("Failed to delete file from S3:", s3Error);
      }
    }

    return NextResponse.json({ message: "Capacitación eliminada exitosamente" });
  } catch (error) {
    console.error("Error deleting capacitación:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
