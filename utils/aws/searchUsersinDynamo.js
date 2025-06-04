import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ScanCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { getAWSCredentialsAndIdentityId } from "./credentials.js";

export async function searchUsersinDynamo(idToken, query) {
  if (!query || query.length === 0) {
    return [];
  }
  const { credentials, identityId } = await getAWSCredentialsAndIdentityId(idToken);

  const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials,
  });

  const ddb = DynamoDBDocumentClient.from(client);

  const command = new ScanCommand({
        TableName: process.env.DYNAMO_USER_TABLE_NAME,
        //Add pagination by using Limit and ExclusiveStartKey when user count is large
        // Limit: 100, 
        // ExclusiveStartKey: lastEvaluatedKey,
        ProjectionExpression: "userid, #nm, email",
        ExpressionAttributeNames: { "#nm": "name" },
        FilterExpression: "contains(#nm, :query) OR contains(email, :query)",
        ExpressionAttributeValues: {
            ":query": query,
        },
    });

  const data = await ddb.send(command);

  return (data.Items || []).map((item) => ({
    id: item.userid,
    name: item.name,
    email: item.email,
  }));
}
