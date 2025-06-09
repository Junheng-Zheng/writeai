import { listFilesInDynamoDB } from "../../../../utils/aws/listFilesinDynamo";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end("Method Not Allowed");
  }

  const cookies = req.headers.cookie || "";
  const idTokenCookie = cookies
    .split("; ")
    .find((c) => c.startsWith("id_token="));
  if (!idTokenCookie) {
    return res.status(401).json({ error: "Missing token" });
  }
  const idToken = idTokenCookie.split("=")[1];

  try {
    const result = await listFilesInDynamoDB(idToken);
    console.log("Sending success response");
    return res.status(200).json({ files: result });
  } catch (error) {
    console.error("List error:", error);
    return res.status(500).json({ error: "Failed to list files" });
  }
}
