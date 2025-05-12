"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Card from "../ui/card";

const Whyus = () => {
  const imgRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });

  const imgRotateX = useTransform(scrollYProgress, [0, 0.2], [15, 0]);
  // const imgRotateX = useTransform(scrollYProgress, [0, 0.2], [30, 0]);

  return (
    <div
      className="bg-blue-darkest rounded-t-[24px] z-200"
      style={{ marginBottom: "-300px" }}
    >
      <div className="flex flex-col gap-[24px] p-[0px] -translate-y-[300px] sm:-translate-y-[300px] py-[48px] px-[var(--space-12)] sm:px-[var(--space-150)]">
        <div
          style={{
            perspective: isMobile ? "900px" : "800px",
          }}
          className="glow-container overflow-hidden rounded-t-[var(--radius-20)] sm:rounded-t-none"
        >
          <motion.img
            ref={imgRef}
            src="/assets/example.png"
            alt="example"
            className="rounded-[var(--radius-20)] h-[300px] object-top-left object-cover sm:h-auto sm:mx-auto sm:scale-100"
            style={{
              rotateX: imgRotateX,
              position: "relative",
              transformStyle: "preserve-3d",
              transformOrigin: "center bottom",
            }}
          />
        </div>

        <Card
          background="updatedbg"
          header="AI Auto-Completion"
          description="Stuck mid-thought? Let AI finish your sentences with clarity and flow, helping you stay productive and focused."
          image="/assets/example.png"
        />

        <Card
          background="updatedbg"
          header="AI Auto-Completion"
          description="Stuck mid-thought? Let AI finish your sentences with clarity and flow, helping you stay productive and focused."
          image="/assets/example.png"
        />

        <Card
          background="updatedbg"
          header="AI Auto-Completion"
          description="Stuck mid-thought? Let AI finish your sentences with clarity and flow, helping you stay productive and focused."
          image="/assets/example.png"
        />
      </div>
    </div>
  );
};

export default Whyus;
