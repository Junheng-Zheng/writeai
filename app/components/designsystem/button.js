import React from "react";

const Button = ({ children, className, size, variant }) => {
  const sizeStyles = {
    small: "py-[12px] text-[14px] px-[24px]",
    medium: "py-[12px] text-[16px] px-[24px]",
    large: "py-[12px] text-[18px] px-[24px]",
  };
  const variantStyles = {
    primary: "bg-white text-black",
    secondary: "bg-black text-white",
    tertiary: "bg-white text-black border border-black/10",
  };
  return (
    <button
      className={`${className} glow-container rounded-full flex items-center  gap-[8px]    ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
      <span className="text-[16px] font-inter">{"->"}</span>
    </button>
  );
};

export default Button;
