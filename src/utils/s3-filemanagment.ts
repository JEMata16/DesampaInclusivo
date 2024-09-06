import * as Minio from 'minio'
import { env } from '~/env'
 
// Create a new Minio client with the S3 endpoint, access key, and secret key
export const s3Client = new Minio.Client({
  endPoint: env.S3_ENDPOINT,
  port: env.S3_PORT ? Number(env.S3_PORT) : undefined,
  accessKey: env.S3_ACCESS_KEY,
  secretKey: env.S3_SECRET_KEY,
  useSSL: env.S3_USE_SSL === 'true',
})
 
export async function createBucketIfNotExists(bucketName: string) {
  const bucketExists = await s3Client.bucketExists(bucketName)
  if (!bucketExists) {
    await s3Client.makeBucket(bucketName)
  }
}