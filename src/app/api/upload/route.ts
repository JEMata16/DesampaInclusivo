import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import * as https from 'https';
import { NodeHttpHandler } from '@aws-sdk/node-http-handler';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const httpAgent = new https.Agent({
  rejectUnauthorized: false,
});

const s3Client = new S3Client({
  region: 'us-east-1', 
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!, 
    secretAccessKey: process.env.S3_SECRET_KEY!, 
  },
  forcePathStyle: true,
  tls: false,
  requestHandler: new NodeHttpHandler({
    httpAgent
  }),
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const stream = Readable.from(buffer);


    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: `${file.name}`,
      Body: stream,
      ContentType: file.type,
      ContentLength: buffer.length,
    });

    await s3Client.send(command);

    return NextResponse.json({ message: 'File uploaded successfully!' });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}