import { getFileinDynamo } from "../../../utils/aws/getFileinDynamo.js";
import { unmarshall } from "@aws-sdk/util-dynamodb";

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

  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "Missing file ID" });
  }

  try {
    const result = await getFileinDynamo(idToken, id);
    if (!result) {
      return res.status(404).json({ error: "File not found" });
    }

    const unmarshalled = unmarshall(result); // convert DynamoDB format → JS object

    console.log("Sending success response");
    return res.status(200).json({ file: unmarshalled });
  } catch (error) {
    console.error("Retrieval error:", error);
    return res.status(500).json({ error: "Failed to retrieve file" });
  }
}