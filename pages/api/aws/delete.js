import { deleteFileInDynamoDB } from "../../../utils/aws/deleteFileinDynamo.js";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
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

  const { id } = req.body;
  if (!id || typeof id!== "string") {
    return res.status(400).json({ error: "Missing or invalid 'id' in request body" });
  }

  try {
    console.log("Deleting file with id:", id, "for token:", idToken);
    const deletedItem = await deleteFileInDynamoDB(idToken, id);
    console.log("Delete success:", deletedItem);
    return res.status(200).json({ deletedItem });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ error: "Failed to delete file" });
  }
}
