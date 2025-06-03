import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BatchGetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { getAWSCredentialsAndIdentityId } from "./credentials.js";

export async function batchGetUsersinDynamo(idToken, subscriptionIds) {
  if (!subscriptionIds || subscriptionIds.length === 0) {
    return [];
  }
  const { credentials, identityId } = await getAWSCredentialsAndIdentityId(idToken);

  const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials,
  });

  const ddb = DynamoDBDocumentClient.from(client);

  const keys = subscriptionIds.map(id => ({ userid: id }));

  const command = new BatchGetCommand({
    RequestItems: {
      [process.env.DYNAMO_USER_TABLE_NAME]: {
        Keys: keys
      }
    }
  });

  const data = await ddb.send(command);

  return (data.Responses?.[process.env.DYNAMO_USER_TABLE_NAME]?.map((item) => ({
        id: item.userid,
        name: item.name,
        email: item.email
    })) || []
  );
}
