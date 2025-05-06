import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
const Tag = ({ children, className }) => {
  const [index, setIndex] = useState(0);
  const words = [
    "Completion Assistant",
    "Rewrite & Stylize",
    "Share & Collaborate",
    "Undetectable",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words]);
  return (
    <div className="bg-white text-[14px] sm:text-[16px]  transition-all w-[175px] sm:w-[225px] justify-center overflow-hidden rounded-full blue px-[var(--space-20)] font-[501] flex items-center gap-[var(--space-10)] border-[1px] border-[var(--color-blue-primary)]">
      <div className="w-fit h-full overflow-hidden py-[var(--space-10)]">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: 0.1,
            }}
            className="w-full text-nowrap flex gap-2 items-center"
          >
            {words[index]}
            <i className="text-[12px] fa-solid fa-pencil"></i>
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tag;
