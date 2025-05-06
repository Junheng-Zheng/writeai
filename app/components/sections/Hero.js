"use client";
import React from "react";
import Navbar from "../navigation/Navbar";
import Tag from "../ui/Tag";
import Star from "../ui/Star";
import Buttonarrow from "../ui/Buttonarrow";
import { motion } from "framer-motion";
const text = "Limitless Writing with AI";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.01,
    },
  },
};

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};
const Hero = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col">
      <Navbar />
      <div className="flex w-full flex-col relative landingbg sm:border-20 sm:border-t-[0px] sm:rounded-[var(--radius-40)] border-white overflow-hidden flex-1 justify-center items-center">
        <img
          src="/assets/noise.jpeg"
          alt="landingbg"
          className="absolute top-0 left-0 w-full h-full opacity-5 object-cover"
        />
      </div>
      <div className="absolute top-0 left-0  px-[var(--space-20)] h-full flex w-full z-200 flex-col justify-center gap-[var(--space-15)] sm:gap-[var(--space-25)] items-center">
        <Tag />
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-white text-[40px]  sm:text-[65px] font-bold flex justify-center flex-wrap"
        >
          {text.split("").map((char, index) => (
            <motion.span
              className="glow-container"
              key={index}
              variants={child}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          className="flex gap-[var(--space-20)] text-white font-[505] text-[21px] h-fit items-center"
        >
          <div className="flex gap-[var(--space-20)] text-white font-[505] text-[16px] sm:text-[21px] h-fit items-center">
            <p className="sm:before:content-['AI-']">Autocomplete</p>
            <Star className="text-[6px] sm:text-[8px] before:bg-white after:bg-white" />
            <p>Rewrite & Stylize your text</p>
            <Star className="hidden sm:block text-[8px]  sm:before:bg-white sm:after:bg-white" />
            <p className="hidden sm:block">Fully Undetectable</p>
          </div>
        </motion.div>
        <div className="flex gap-[var(--space-15)] sm:gap-[var(--space-20)]">
          <Buttonarrow variant="secondary">View Demo</Buttonarrow>
          <Buttonarrow variant="primary">Get Started</Buttonarrow>
        </div>
      </div>
    </div>
  );
};

export default Hero;
