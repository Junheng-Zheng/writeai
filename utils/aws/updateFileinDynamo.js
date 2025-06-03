import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { getAWSCredentialsAndIdentityId } from "./credentials.js";

export async function updateFileInDynamoDB(idToken, id, updates) {
  const { credentials, identityId } = await getAWSCredentialsAndIdentityId(idToken);

  const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials,
  });

  const ddb = DynamoDBDocumentClient.from(client);

  // Dynamically build UpdateExpression and ExpressionAttributeValues
  let updateExpr = "SET";
  const exprAttrValues = {};
  const exprAttrNames = {};
  let prefix = " ";

  for (const [key, value] of Object.entries(updates)) {
    const attrNamePlaceholder = `#${key}`;
    const attrValuePlaceholder = `:${key}`;

    updateExpr += `${prefix}${attrNamePlaceholder} = ${attrValuePlaceholder}`;
    prefix = ", ";

    exprAttrValues[attrValuePlaceholder] = value;
    exprAttrNames[attrNamePlaceholder] = key;
  }

  const command = new UpdateCommand({
    TableName: process.env.DYNAMO_TABLE_NAME,
    Key: {
      PK: `USER#${identityId}`,
      SK: id,
    },
    UpdateExpression: updateExpr,
    ExpressionAttributeValues: exprAttrValues,
    ExpressionAttributeNames: exprAttrNames,
    ReturnValues: "ALL_NEW",
  });

  const data = await ddb.send(command);

  return data.Attributes; // Return the updated item attributes
}
