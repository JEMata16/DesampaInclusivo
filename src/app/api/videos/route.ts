import { GetObjectCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as https from "https";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { videos, files } from "~/server/db/schema";


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
