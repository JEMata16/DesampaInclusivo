import { GetObjectCommand, GetObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

 
// Create a new Minio client with the S3 endpoint, access key, and secret key
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

// Helper to generate a signed URL for S3 objects
export async function generateSignedUrl(fileName: string): Promise<string> {
  const command: GetObjectCommandInput = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
  };

  try {
    return await getSignedUrl(
      s3Client as any,
      new GetObjectCommand(command) as any,
      { expiresIn: 3600 }
    );
  } catch (error) {
    console.error(`Error generating signed URL for file "${fileName}":`, error);
    return "";
  }
}