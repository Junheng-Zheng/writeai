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
    <div className="flex items-center gap-[16px] p-[8px] w-[200px] text-white rounded-full rainbow-radial justify-center">
      <div className="w-fit h-full overflow-hidden">
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
