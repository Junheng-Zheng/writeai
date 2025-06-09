import { updateFileInDynamoDB } from "../../../../utils/aws/updateFileinDynamo";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
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

  const { id, updates } = req.body;
  if (!id || !updates || typeof updates !== "object") {
    return res.status(400).json({ error: "Missing or invalid 'id' or 'updates' in request body" });
  }

  try {
    console.log(idToken, id, updates);
    const updatedItem = await updateFileInDynamoDB(idToken, id, updates);
    console.log("Update success:", updatedItem);
    return res.status(200).json({ updatedItem });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ error: "Failed to update file" });
  }
}
