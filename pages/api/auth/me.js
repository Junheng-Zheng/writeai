export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end('Method Not Allowed');
  }

  const cookies = req.headers.cookie || '';
  const idTokenCookie = cookies.split('; ').find(c => c.startsWith('id_token='));
  if (!idTokenCookie) {
    return res.status(401).json({ error: 'No id_token cookie' });
  }
  const idToken = idTokenCookie.split('=')[1];

  // decode id_token payload
  function parseJwt(token) {
    try {
      return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    } catch {
      return null;
    }
  }

  const userInfo = parseJwt(idToken);
  if (!userInfo) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  res.status(200).json(userInfo);
}
