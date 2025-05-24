import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getAWSCredentialsAndIdentityId } from "./credentials.js";

export async function uploadToS3(fileBuffer, fileName, contentType, idToken) {
  const { credentials, identityId } = await getAWSCredentialsAndIdentityId(idToken);

  const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials,
  });

  const key = `${identityId}/${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  });

  return s3.send(command);
}
