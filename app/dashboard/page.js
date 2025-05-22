'use client';

import { useEffect, useState } from 'react';

// Simple JWT decoder (just base64 decode the payload)
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (!code) {
      setError('No authorization code found in URL');
      return;
    }

    async function fetchTokens() {
      try {
        const res = await fetch('/api/auth/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
          credentials: 'include',
        });

        if (!res.ok) {
          const errData = await res.json();
          setError(errData.error?.message || 'Failed to fetch tokens');
          return;
        }

        const data = await res.json();
        const userInfo = parseJwt(data.id_token);
        if (!userInfo) {
          setError('Failed to decode user info');
          return;
        }

        setUser(userInfo);
      } catch (err) {
        setError('Network error');
      }
    }

    fetchTokens();
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  if (!user) {
    return <p>Loading user info...</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.name || user.email || user['cognito:username']}</h1>
      <p>Email: {user.email}</p>
      <p>Username: {user['cognito:username']}</p>
      {/* Display more user attributes if needed */}
    </div>
  );
}
