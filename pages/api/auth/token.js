export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Missing code" });
    }

    const origin = req.headers.origin || '';
    const redirectUri = `${origin}/dashboard`;

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", process.env.COGNITO_CLIENT_ID);
    params.append("code", code);
    params.append("redirect_uri", redirectUri);

    const basicAuth = Buffer.from(
      `${process.env.COGNITO_CLIENT_ID}:${process.env.COGNITO_CLIENT_SECRET}`
    ).toString("base64");

    const response = await fetch(
      "https://us-east-2Wosz12rjA.auth.us-east-2.amazoncognito.com/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${basicAuth}`,
        },
        body: params.toString(),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    // Set cookies (Express-style)
    res.setHeader("Set-Cookie", [
      // Stores for 1 Hour
      `id_token=${data.id_token}; HttpOnly; Path=/; Secure; SameSite=Lax; Max-Age=3600`,
      `access_token=${data.access_token}; HttpOnly; Path=/; Secure; SameSite=Lax; Max-Age=3600`,
      // Stores for 30 days
      `refresh_token=${data.refresh_token}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`
    ]);

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
