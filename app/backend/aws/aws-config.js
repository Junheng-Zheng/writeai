export const amplifyConfig = {
  Auth: {
    region: "us-east-2", 
    userPoolId: "us-east-2_Wosz12rjA",
    userPoolWebClientId: "7vb6ksijcjvgve65fs0htb9ao4",
    identityPoolId: "us-east-2:5cefb116-d54b-412f-95ce-f166f37a4fc6",
  },
  Storage: {
    AWSS3: {
      bucket: "writeai-documents",
      region: "us-east-2",
    },
  },
};
