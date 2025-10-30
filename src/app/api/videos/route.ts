import { DeleteObjectCommand,GetObjectCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as https from "https";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { videos, files } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { auth, clerkClient } from "@clerk/nextjs/server";


const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
  forcePathStyle: true,
  tls: false,
});


export async function GET() {
    try {
    const allVideos = await db.query.videos.findMany({
      with: { file: true },
      orderBy: (videos, { desc }) => [desc(videos.createdAt)],
    });

    const result = await Promise.all(
      allVideos.map(async (video) => {
        let url = "";
        if (video.file && video.file.fileName) {
          const command = new GetObjectCommand({
            Bucket: "desampainclusivo",
            Key: video.file.fileName,
          });
          url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        }
        return {
          key: video.id.toString(),
          title: video.title,
          url,
        };
      })
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const { userId } = auth();
    if (!userId) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

    const clerkUser = await clerkClient().users.getUser(userId);
    const role = clerkUser.publicMetadata?.orgRole as string | undefined;

    const video = await db.query.videos.findFirst({
      where: eq(videos.id, id),
      with: { file: true },
    });
    if (!video) return NextResponse.json({ error: "Video no encontrado" }, { status: 404 });

    const isAdmin = role === "admin" || role === "org:admin" || role === "org:muni";

    if (!isAdmin) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    await db.delete(videos).where(eq(videos.id, id));
    if (video.file) {
      await db.delete(files).where(eq(files.id, video.file.id));
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
