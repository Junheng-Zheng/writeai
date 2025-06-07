import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { getAWSCredentialsAndIdentityId } from "./credentials.js";

export async function getFileinDynamo(idToken, id) {
  const { credentials, identityId } = await getAWSCredentialsAndIdentityId(idToken);

  const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials,
  });

  const ddb = DynamoDBDocumentClient.from(client);

  console.log("Fetching file with ID:", id, "for user with identity ID:", identityId);
  const command = new GetItemCommand({
    TableName: process.env.DYNAMO_TABLE_NAME,
    Key: {
        PK: { S: `USER#${identityId}` },
        SK: { S: `DOC#${id}` }
    },
  });

  const data = await ddb.send(command);
  console.log("Data retrieved from DynamoDB:", data);

  if (!data.Item) return null;

  return {
    id: data.Item.SK,
    name: data.Item.title,
    creationDate: data.Item.created_at,
    lastModified: data.Item.updated_at,
    lastOpened: data.Item.last_opened,
    size: data.Item.file_size,
    contributors: data.Item.contributors,
    content: data.Item.slate_json
  }
}
