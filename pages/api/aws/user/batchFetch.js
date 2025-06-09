import { batchGetUsersinDynamo } from "../../../../utils/aws/batchGetUsersinDynamo.js";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
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

  const { userIds } = req.body;

  if (!Array.isArray(userIds) || userIds.length === 0) {
    return res.status(400).json({ error: "Missing or invalid 'userIds' in request body" });
  }

  try {
    const users = await batchGetUsersinDynamo(idToken, userIds);
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Failed to batch fetch users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
