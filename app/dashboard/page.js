'use client';
import { useEffect, useState } from 'react';

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

    async function fetchTokensAndUser() {
      try {
        // Step 1: Exchange code for tokens, cookies set here
        const tokenRes = await fetch('/api/auth/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
          credentials: 'include', // important to receive cookies!
        });

        if (!tokenRes.ok) {
          const errData = await tokenRes.json();
          setError(errData.error?.message || 'Failed to fetch tokens');
          return;
        }

        // Step 2: Call /api/auth/me to get user info
        const meRes = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include', // send cookies automatically
        });

        if (!meRes.ok) {
          const errData = await meRes.json();
          setError(errData.error || 'Failed to fetch user info');
          return;
        }

        const userInfo = await meRes.json();
        setUser(userInfo);
      } catch (err) {
        setError('Network error');
      }
    }

    fetchTokensAndUser();
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
    </div>
  );
}
