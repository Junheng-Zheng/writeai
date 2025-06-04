import { searchUsersinDynamo } from "../../../utils/aws/searchUsersinDynamo.js";

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
    const searchQuery = req.query.q;
    if (!searchQuery || !idToken) {
    return res.status(400).json({ error: "Missing query" });
    }

    try {
        const result = await searchUsersinDynamo(idToken, searchQuery);
        console.log("Sending success response");
        return res.status(200).json({ users: result });
    } catch (error) {
        console.error("List error:", error);
        return res.status(500).json({ error: "Failed to list files" });
    }
}
