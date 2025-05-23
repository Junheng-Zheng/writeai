'use client';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    async function fetchTokensAndUser() {
        try {
        // Step 1: Try to exchange the code if it's in the URL
        if (code) {
            const tokenRes = await fetch('/backend/api/auth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
            credentials: 'include',
            });

            if (tokenRes.ok) {
            // Clean up the URL so the code is not reused
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('code');
            window.history.replaceState({}, '', newUrl);
            } else {
            console.warn('Token exchange failed, falling back to cookie.');
            }
        }

        // Step 2: Always try to load from cookie
        const meRes = await fetch('/backend/api/auth/me', {
            method: 'GET',
            credentials: 'include',
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
      <h1>Welcome, {user.name?.split(' ')[0] || user.email || user['cognito:username']}</h1>
      <p>Email: {user.email}</p>
      <p>Username: {user['cognito:username']}</p>
    </div>
  );
}
