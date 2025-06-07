"use client";
import { useEffect, useState } from "react";
import DashboardHeader from "../components/designsystem/dashboardHeader";
import Button from "../components/designsystem/button";
import Dropdown from "../components/ui/Dropdown";
import DocCard from "../components/designsystem/docCard";
export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");
  const [enriched, setEnriched] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function init() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      async function fetchTokensAndUser() {
        try {
          if (code) {
            const tokenRes = await fetch("/api/auth/token", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ code }),
              credentials: "include",
            });

            if (tokenRes.ok) {
              const newUrl = new URL(window.location.href);
              newUrl.searchParams.delete("code");
              window.history.replaceState({}, "", newUrl);
            } else {
              console.warn("Token exchange failed, falling back to cookie.");
            }
          }

          const meRes = await fetch("/api/auth/me", {
            method: "GET",
            credentials: "include",
          });

          if (!meRes.ok) {
            const errData = await meRes.json();

            if (meRes.status === 401) {
              const isLocalhost =
                window.location.hostname === "localhost" ||
                window.location.hostname === "127.0.0.1";

              const redirectUri = isLocalhost
                ? "http://localhost:3000/dashboard"
                : "https://writeai-five.vercel.app/dashboard";

              const loginUrl = `https://us-east-2wosz12rja.auth.us-east-2.amazoncognito.com/login?client_id=7vb6ksijcjvgve65fs0htb9ao4&redirect_uri=${encodeURIComponent(
                redirectUri
              )}&response_type=code&scope=email+openid+phone+profile`;

              window.location.href = loginUrl;
              return;
            }

            setError(errData.error || "Failed to fetch user info");
            return null;
          }

          const userInfo = await meRes.json();
          setUser(userInfo);
          return userInfo;
        } catch (err) {
          setError("Network error");
          return null;
        }
      }

      const fetchedUser = await fetchTokensAndUser();

      if (fetchedUser) {
        await handleListFiles();
      }
    }

    init();
  }, []);

  async function waitForFileProcessing(fileName, timeout = 30000, interval = 2000) {
    const start = Date.now();

    while (Date.now() - start < timeout) {
      try {
        const response = await fetch("/api/aws/list", { credentials: "include" });
        if (!response.ok) throw new Error("Failed to list files");
        const data = await response.json();

        if (data.files.some(f => f.name === fileName)) {
          return true; // Metadata is ready
        }
      } catch (err) {
        console.warn("Polling error:", err);
      }

      // Wait before next poll
      await new Promise(res => setTimeout(res, interval));
    }

    throw new Error("Timeout waiting for file to be processed");
  }

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
        alert("Upload successful");
      } else {
        setStatus(`Upload failed: ${data?.error || "Unknown error"}`);
        alert("Upload failed");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setStatus("Upload failed (network error)");
      alert("Upload failed");
    } finally {
      setUploading(false);
      handleListFiles();
    }
  }

  async function handleListFiles() {
    try {
      setUploading(true);

      const response = await fetch("/api/aws/list", {
        method: "GET",
        credentials: "include", // ensures cookies (like id_token) are sent
      });

      const data = await response.json();
      console.log("List response:", data);

      if (response.ok) {
        setFiles(data.files);
      } else {
        alert(`Failed to list files: ${data?.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("List failed:", err);
      alert("Failed to list files (network error)");
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
    try {
      await handleFileUpload(selectedFile);

      await waitForFileProcessing(selectedFile.name);

      await handleListFiles();
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function fetchUserMetadata(userIds) {
    const response = await fetch("/api/aws/batchFetch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userIds }),
      credentials: "include" 
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }

    const data = await response.json();
    return data.users; 
  }
  
  useEffect(() => {
  async function enrichFilesWithContributors() {
    if (files.length === 0 || enriched) return;

    const updatedFiles = await Promise.all(
      files.map(async (file) => {
        if (!file.contributors || file.contributors.length === 0) {
          return { ...file, contributors: [] };
        }
        try {
          const contributors = await fetchUserMetadata(file.contributors);
          return { ...file, contributors };
        } catch (err) {
          console.error("Contributor fetch failed for file:", file.name, err);
          return { ...file, contributors: [] };
        }
      })
    );

    setFiles(updatedFiles);
    setEnriched(true);
  }

  enrichFilesWithContributors();
}, [files, enriched]);

  
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!user)
  return (
    <div className="flex justify-center items-center h-screen">
      Loading user info...
    </div>
  );
  return (
    <div>
      <DashboardHeader />
      <input
        type="file"
        accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,application/pdf,.txt,text/plain"
        onChange={(e) => setSelectedFile(e.target.files[0])}
        disabled={uploading}
      />
      <button onClick={onUploadClick} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload File"}
      </button>
      <div className="flex flex-col px-[36px]">
        <div className="flex flex-col gap-[24px] p-[36px] border-l border-r border-black/10">
          <div className="pb-[24px] border-b border-black/10 flex justify-between items-center">
            <h1 className="text-[24px]">
              Welcome back,{" "}
              {user.name?.split(" ")[0] ||
                user.email ||
                user["cognito:username"]}
            </h1>
            {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
            <div className="flex items-center gap-[24px]">
              <Button variant={"tertiary"} size={"medium"} arrow={false}>
                Recent
              </Button>
              <i className="fa-solid fa-arrow-down-a-z"></i>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5  gap-[24px]">
            <div className="aspect-[8/11.5] border cursor-pointer hover:bg-black/5 text-black/30 flex-col gap-[24px] border-black/10 flex items-center justify-center">
              <i className="fa-solid fa-plus text-[24px] "></i>
              <p>New Document</p>
            </div>
            {files.map((file) => (
              <DocCard
                key={file.id}
                id={file.id}
                title={`${file.name} - ${Math.round(file.size / 1024)} KB`}
                contributors={file.contributors}
                created={file.creationDate ? new Date(file.creationDate).toLocaleDateString() : "N/A"}
                updated={file.lastModified ? new Date(file.lastModified).toLocaleDateString() : "N/A"}
                opened={file.lastOpened ? new Date(file.lastOpened).toLocaleDateString() : "N/A"}
                fetchUserMetadata={fetchUserMetadata}
                onContributorsUpdate={(newContributors) => {
                  setFiles(prevFiles =>
                    prevFiles.map(f =>
                      f.id === file.id ? { ...f, contributors: newContributors } : f
                    )
                  );
                }}
                onDelete={(deletedId) => {
                  setFiles((prev) => prev.filter((d) => d.id !== deletedId));
                }}
                onClick={() => {
                  const cleanedId = file.id.startsWith("DOC#") ? file.id.slice(4) : file.id;
                  window.location.href = `/writeai?id=${cleanedId}`;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
