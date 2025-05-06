"use client";
import React from "react";
import Buttonarrow from "./Buttonarrow";
import { motion } from "framer-motion";
const Card = ({ header, description, image, background }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
        },
      }}
      viewport={{ once: true }}
      className={`w-full sm:h-[295px] h-fit overflow-hidden sm:pt-none pt-[var(--space-25)] bg-white glow-container relative rounded-[var(--radius-20)] sm:px-[var(--space-50)] px-[var(--space-25)] gap-[var(--space-25)] flex flex-col sm:flex-row items-center pr-0 ${background}`}
    >
      <img
        src="/assets/noise.jpeg"
        alt="landingbg"
        className="absolute top-0 left-0 w-full h-full opacity-8 object-cover"
      />
      <div className="flex w-full z-200 flex-col gap-[var(--space-20)] pr-[var(--space-25)] sm:pr-0">
        <div className="flex items-center gap-[var(--space-8)]">
          <img
            src="/assets/icon.png"
            alt="logo"
            className="w-[30px] h-[30px]"
          />
          <h3 className="text-white text-[27px] sm:text-[32px] font-semibold">
            {header}
          </h3>
        </div>
        <p className="text-white text-[16px] sm:text-[18px]">{description}</p>
        <div className="w-full flex sm:justify-start justify-end">
          <Buttonarrow variant="secondary">Get Started</Buttonarrow>
        </div>
      </div>
      <div className="w-full z-200 h-full flex items-end justify-center ">
        <img
          src={image}
          alt="example"
          className="h-[75%] w-full object-cover sm:rounded-t-[var(--radius-20)] rounded-tl-[var(--radius-20)]"
        />
      </div>
    </motion.div>
  );
};

export default Card;
