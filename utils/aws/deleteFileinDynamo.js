import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { getAWSCredentialsAndIdentityId } from "./credentials.js";

export async function deleteFileInDynamoDB(idToken, id) {
  const { credentials, identityId } = await getAWSCredentialsAndIdentityId(idToken);

  const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials,
  });

  const ddb = DynamoDBDocumentClient.from(client);

  const command = new DeleteCommand({
    TableName: process.env.DYNAMO_TABLE_NAME,
    Key: {
      PK: `USER#${identityId}`,
      SK: id,
    },
    ReturnValues: "ALL_OLD",
  });

  const data = await ddb.send(command);

  return data.Attributes;
}