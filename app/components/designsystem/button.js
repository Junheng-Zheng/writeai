import React from "react";

const Button = ({ children, className, variant }) => {
  const variantStyles = {
    primary: "bg-white text-black",
    secondary: "bg-black text-white",
  };
  return (
    <button
      className={`${className} glow-container py-[12px] text-[16px] px-[24px]  ${variantStyles[variant]} rounded-lg`}
    >
      {children}
    </button>
  );
};

export default Button;
