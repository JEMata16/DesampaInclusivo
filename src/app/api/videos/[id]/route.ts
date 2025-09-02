import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { videos, files } from "~/server/db/schema";
import { S3Client, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
  forcePathStyle: true,
});


export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);

    const video = await db.query.videos.findFirst({
      where: eq(videos.id, id),
      with: { file: true },
    });

    if (!video) {
      return NextResponse.json({ error: "Video no encontrado" }, { status: 404 });
    }

    let url = "";
    if (video.file && video.file.fileName) {
      const command = new GetObjectCommand({
        Bucket: "desampainclusivo",
        Key: video.file.fileName,
      });
      url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    }

    return NextResponse.json({
      key: video.id.toString(),
      title: video.title,
      url,
    });
  } catch (error) {
    console.error("Error fetching video:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}



export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    // Fetch video + file
    const video = await db.query.videos.findFirst({
      where: eq(videos.id, id),
      with: { file: true },
    });

    if (!video) {
      return NextResponse.json({ error: "Video no encontrado" }, { status: 404 });
    }

    // Delete video
    await db.delete(videos).where(eq(videos.id, id));

    // Also delete associated file
    if (video.file) {
      // Delete from DB
      await db.delete(files).where(eq(files.id, video.file.id));

      // Delete from S3
      try {
        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: video.file.bucket,
            Key: video.file.fileName,
          })
        );
      } catch (s3Error) {
        console.error("Failed to delete file from S3:", s3Error);
      }
    }

    return NextResponse.json({ message: "Video eliminado exitosamente" });
  } catch (error) {
    console.error("Error deleting video:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
