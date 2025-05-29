export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end('Method Not Allowed');
  }

  const cookies = req.headers.cookie || '';
  const getCookie = (name) => {
    const match = cookies.split('; ').find(c => c.startsWith(`${name}=`));
    return match ? match.split('=')[1] : null;
  };

  let idToken = getCookie('id_token');
  const refreshToken = getCookie('refresh_token');

  // decode id_token payload
  function parseJwt(token) {
    try {
      return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    } catch {
      return null;
    }
  }

  let userInfo = idToken ? parseJwt(idToken) : null;
  const now = Math.floor(Date.now() / 1000);

  // If id_token missing or expired, try refreshing
  if (!userInfo || (userInfo.exp && now >= userInfo.exp)) {
    if (!refreshToken) {
      return res.status(401).json({ error: 'Session expired. Please log in again.' });
    }
    console.log("Tokens expired, attempting to refresh");

    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("client_id", process.env.COGNITO_CLIENT_ID);
    params.append("refresh_token", refreshToken);

    const basicAuth = Buffer.from(
      `${process.env.COGNITO_CLIENT_ID}:${process.env.COGNITO_CLIENT_SECRET}`
    ).toString("base64");

    const tokenResponse = await fetch(
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

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.id_token) {
      return res.status(401).json({ error: 'Failed to refresh session. Please log in again.' });
    }

    // Save new tokens in cookies
    res.setHeader("Set-Cookie", [
      `id_token=${tokenData.id_token}; HttpOnly; Path=/; Secure; SameSite=Lax; Max-Age=3600`,
      `access_token=${tokenData.access_token}; HttpOnly; Path=/; Secure; SameSite=Lax; Max-Age=3600`,
    ]);

    idToken = tokenData.id_token;
    userInfo = parseJwt(idToken);
  }

  res.status(200).json(userInfo);
}
