import { eq, sql } from "drizzle-orm";
import { db } from "~/server/db";
import { files, posts } from "~/server/db/schema";
import * as https from "https";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";

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

export async function GET({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const userPosts = await db.query.posts.findMany({
    where: (eq(posts.authorId, userId)),
  });
  const userFiles = await db.query.files.findMany({
    where: (eq(files.authorId, userId)),
  });


  const command = new GetObjectCommand({
    Bucket: "desampainclusivo",
    Key: userFiles[0]?.fileName
  })

  try {
    const response = await s3Client.send(command);
    console.log(response);
  } catch (error) {
    console.log(error);
  }

}
