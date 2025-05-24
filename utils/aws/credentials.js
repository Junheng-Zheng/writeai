import {
  CognitoIdentityClient,
  GetIdCommand,
} from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

export async function getAWSCredentialsAndIdentityId(idToken) {
  const client = new CognitoIdentityClient({ region: process.env.AWS_REGION });

  // Get identity ID from the identity pool by passing the login map
  const getIdCommand = new GetIdCommand({
    IdentityPoolId: process.env.IDENTITY_POOL_ID,
    Logins: {
      [process.env.USER_POOL_PROVIDER]: idToken,
    },
  });

  const response = await client.send(getIdCommand);
  const identityId = response.IdentityId;

  // Create credentials provider
  const credentials = fromCognitoIdentityPool({
    client,
    identityPoolId: process.env.IDENTITY_POOL_ID,
    logins: {
      [process.env.USER_POOL_PROVIDER]: idToken,
    },
  });

  return { credentials, identityId };
}
