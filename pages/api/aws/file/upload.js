import formidable from "formidable";
import fs from "fs";
import { uploadToS3 } from "/utils/aws/uploadToS3";

export const config = {
  api: {
    bodyParser: false, // Required for formidable
  },
};

// Helper to parse form using Promise
function parseForm(req) {
  const form = formidable({ multiples: false });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

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

  try {
    const { fields, files } = await parseForm(req);

    const file = files.file[0];
    const fileBuffer = fs.readFileSync(file.filepath);
    const fileName = file.originalFilename;
    const contentType = file.mimetype;

    const result = await uploadToS3(fileBuffer, fileName, contentType, idToken);
    console.log("Sending success response");
    return res.status(200).json({ message: "Upload successful", result });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Upload failed" });
  }
}
