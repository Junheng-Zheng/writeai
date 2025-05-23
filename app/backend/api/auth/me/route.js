export async function GET(req) {
  const cookies = req.headers.get('cookie') || '';
  const idTokenCookie = cookies.split('; ').find(c => c.startsWith('id_token='));
  if (!idTokenCookie) {
    return new Response(JSON.stringify({ error: 'No id_token cookie' }), { status: 401 });
  }
  const idToken = idTokenCookie.split('=')[1];

  // decode id_token (just the payload)
  function parseJwt(token) {
    try {
      return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    } catch {
      return null;
    }
  }

  const userInfo = parseJwt(idToken);
  if (!userInfo) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
  }

  return new Response(JSON.stringify(userInfo), { status: 200 });
}
