import { desc, eq } from "drizzle-orm";
import { db } from "~/server/db";
import { capacitaciones, files } from "~/server/db/schema";
import * as https from "https";
import {
  GetObjectCommand,
  GetObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import { NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
};

type Capc = {
  id: number;
  name: string;
  description: string;
  link?: string;
  date: string;
  time: string;
  mediaId: string;
  image: Image[];
};

export async function GET(req: any) {
  try {
    // Fetch all capacitaciones
    const result = await db
      .select({
        capc: capacitaciones,
        files: files,
      })
      .from(capacitaciones)
      .innerJoin(files, eq(files.id, capacitaciones.mediaId))
      .orderBy(desc(capacitaciones.date));

    if (!result || result.length === 0) {
      return NextResponse.json({ capc: [], files: [] }, { status: 200 });
    }

    const capcWithImages: any = {};

    // Join trainings with images as a single object
    for (const row of result) {
      const capcId = row.capc.id;
      if (!capcWithImages[capcId]) {
        capcWithImages[capcId] = {
          ...row.capc,
          image: {},
        };
      }

      capcWithImages[capcId].image = {
        fileName: row.files.fileName,
        originalName: row.files.originalName,
        bucket: row.files.bucket,
        size: row.files.size,
      };
    }

    // Generate image signed URLs
    for (const capcId in capcWithImages) {
      const capc = capcWithImages[capcId];
      for (const imageKey in capc.images) {
        const image = capc.images[imageKey];
        const command: GetObjectCommandInput = {
          Bucket: image.bucket,
          Key: image.fileName,
        };

        try {
          const signedUrl = await getSignedUrl(
            s3Client as any,
            new GetObjectCommand(command) as any,
            { expiresIn: 3600 },
          );
          capc.images[imageKey].signedUrl = signedUrl;
        } catch (error: any) {
          console.error("Error generating signed URL:", error.message);
          capc.images[imageKey].signedUrl = null; // Add a fallback for failed URLs
        }
      }
    }

    return NextResponse.json(
      { capcs: Object.values(capcWithImages) },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("GET error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
