import { GetObjectCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as https from "https";
import { NextResponse } from "next/server";


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


export async function GET(req: any) {
    try {
      // Listar objetos
      const listCommand = new ListObjectsV2Command({
        Bucket: process.env.S3_BUCKET_NAME!,
        Prefix: "videos/", // Ensure it targets the "videos" folder
      });
  
      const listResponse = await s3Client.send(listCommand);
  
      // Asegurar de que la lista no este vacia
      if (!listResponse.Contents) {
        return NextResponse.json({ message: "No videos found" }, { status: 404 });
      }
  
      // Generate signed URLs for each object
      const signedUrls = await Promise.all(
        listResponse.Contents.map(async (item) => {
          if (item.Key) {
            const signedUrl = await getSignedUrl(
              s3Client as any,
              new GetObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME!,
                Key: item.Key,
              }) as any,
              { expiresIn: 3600 }
            );
            return { key: item.Key, url: signedUrl };
          }
        })
      );
  
      return NextResponse.json(signedUrls, { status: 200 });
    } catch (error) {
      console.error("Error generating signed URLs:", error);
      return NextResponse.json(
        { message: "Failed to generate signed URLs", error },
        { status: 500 }
      );
    }
  }
