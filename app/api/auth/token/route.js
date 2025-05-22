export async function POST(req) {
    
  const { code } = await req.json();

  if (!code) {
    return new Response(JSON.stringify({ error: 'Missing code' }), { status: 400 });
  }
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', process.env.COGNITO_CLIENT_ID)
  params.append('code', code);
  params.append('redirect_uri', 'https://writeai-five.vercel.app/dashboard');

  const basicAuth = Buffer.from(
    `${process.env.COGNITO_CLIENT_ID}:${process.env.COGNITO_CLIENT_SECRET}`
  ).toString('base64');

  try {
    const response = await fetch(
      'https://us-east-2Wosz12rjA.auth.us-east-2.amazoncognito.com/oauth2/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${basicAuth}`,
        },
        body: params.toString(),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data }), { status: response.status });
    }

    const headers = new Headers();
    headers.append(
    'Set-Cookie',
    `id_token=${data.id_token}; HttpOnly; Path=/; Secure; SameSite=Lax; Max-Age=3600`
    );
    headers.append(
    'Set-Cookie',
    `access_token=${data.access_token}; HttpOnly; Path=/; Secure; SameSite=Lax; Max-Age=3600`
    );
    
    return new Response(JSON.stringify(data), { status: 200, headers});
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
