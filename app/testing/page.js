"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Use dynamic import with no SSR for the editor component
const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] border mt-4 p-4">Loading editor...</div>
  ),
});

const Page = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <div className="p-6">{isClient && <RichTextEditor />}</div>;
};

export default Page;
