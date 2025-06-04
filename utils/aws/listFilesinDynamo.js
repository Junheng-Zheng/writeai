import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getAWSCredentialsAndIdentityId } from "./credentials.js";

export async function listFilesInDynamoDB(idToken) {
  const { credentials, identityId } = await getAWSCredentialsAndIdentityId(idToken);

  const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials,
  });

  const ddb = DynamoDBDocumentClient.from(client);

  const command = new QueryCommand({
    TableName: process.env.DYNAMO_TABLE_NAME,
    KeyConditionExpression: "PK = :pk",
    ExpressionAttributeValues: {
      ":pk": `USER#${identityId}`,
    },
  });

  const data = await ddb.send(command);

  return data.Items?.map((item) => ({
    id: item.SK,
    name: item.title,
    creationDate: item.created_at,
    lastModified: item.updated_at,
    lastOpened: item.last_opened,
    size: item.file_size,
    contributors: item.contributors
  })) || [];
}
