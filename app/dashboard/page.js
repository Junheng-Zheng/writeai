'use client';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    async function fetchTokensAndUser() {
      try {
        if (code) {
          const tokenRes = await fetch('/api/auth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
            credentials: 'include',
          });

          if (tokenRes.ok) {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('code');
            window.history.replaceState({}, '', newUrl);
          } else {
            console.warn('Token exchange failed, falling back to cookie.');
          }
        }

        const meRes = await fetch('/api/auth/me', {
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

  // Move helper functions outside of useEffect
  async function handleFileUpload(file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      const response = await fetch("/api/aws/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();
      console.log("Upload response:", data);

      if (response.ok) {
        setStatus("Upload successful!");
        alert("Upload successful")
      } else {
        setStatus(`Upload failed: ${data?.error || "Unknown error"}`);
        alert("Upload failed")
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setStatus("Upload failed (network error)");
      alert("Upload failed")
    } finally {
      setUploading(false);
    }
  }

  async function onUploadClick() {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
    setUploading(true);
    await handleFileUpload(selectedFile);
    setUploading(false);
    
  }

  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!user) return <p>Loading user info...</p>;

  return (
    <div>
      <h1>Welcome, {user.name?.split(' ')[0] || user.email || user['cognito:username']}</h1>
      <p>Email: {user.email}</p>
      <p>Username: {user['cognito:username']}</p>

      <hr />

      <h2>Upload a File</h2>
      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
        disabled={uploading}
      />
      <button onClick={onUploadClick} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload File"}
      </button>
    </div>
  );
}
