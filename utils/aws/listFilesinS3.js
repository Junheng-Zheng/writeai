import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getAWSCredentialsAndIdentityId } from "./credentials.js";

export async function listFilesInS3(idToken) {
const { credentials, identityId } = await getAWSCredentialsAndIdentityId(
    idToken
    );
  const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials,
  });

  const prefix = `${identityId}/`;


  const command = new ListObjectsV2Command({
    Bucket: process.env.S3_BUCKET_NAME,
    Prefix: prefix,
  });

  const data = await s3.send(command);

  return data.Contents?.map((item) => ({
    key: item.Key,
    lastModified: item.LastModified,
    size: item.Size,
  })) || [];
}
