import React from "react";

const Buttonarrow = ({ children, variant, onClick, className }) => {
  const variantStyles = {
    primary: [
      "blue-gradient-bg border-[1px] border-white text-white",
      "blue bg-white blue",
    ],
    secondary: [
      "whitegradient-bg border-[1px] border-[var(--color-light-blue)] blue",
      "blue-bg text-white",
    ],
  };
  return (
    <button
      onClick={onClick}
      className={`${className} cursor-pointer text-[16px] sm:text-[18px] flex gap-[var(--space-10)] items-center w-[165px] sm:w-[175px] rounded-full justify-center py-[var(--space-12)] font-[505] ${variantStyles[variant][0]}`}
    >
      {children}
      <div
        className={`flex aspect-square w-[var(--space-25)] rounded-full items-center justify-center ${variantStyles[variant][1]}`}
      >
        <i className="text-[16px] sm:text-[18px] fa-solid fa-arrow-right"></i>
      </div>
    </button>
  );
};

export default Buttonarrow;
