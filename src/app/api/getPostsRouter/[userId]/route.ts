import { eq, sql } from "drizzle-orm";
import { db } from "~/server/db";
import { files, posts } from "~/server/db/schema";
import * as https from "https";
import { GetObjectCommand, GetObjectCommandInput, S3Client } from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import { NextResponse } from "next/server";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
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

export async function GET(
  req: any,
  {
    params: { userId },
  }: {
    params: { userId: string };
  },
) {
  const userPosts = await db.query.posts.findMany({
    where: eq(posts.authorId, userId),
  });
  const userFiles = await db.query.files.findMany({
    where: eq(files.authorId, userId),
  });

  if (userFiles.length === 0) {
    return NextResponse.json({ posts: userPosts, files: [] }, { status: 200 });
  }


  const command: GetObjectCommandInput = {
    Bucket: "desampainclusivo",
    Key: "download.jpg",
  };

  try {
    const url = await getSignedUrl(s3Client as any, new GetObjectCommand(command) as any, { expiresIn: 3600 });

    return NextResponse.json({ posts: userPosts, image: url }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
