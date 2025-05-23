import React from "react";

const Button = ({ children, className, size, variant }) => {
  const sizeStyles = {
    small: "py-[12px] text-[14px] px-[24px]",
    medium: "py-[12px] text-[16px] px-[24px]",
    large: "py-[12px] text-[16px] px-[24px]",
  };
  const variantStyles = {
    primary: "bg-white text-black",
    secondary: "bg-black text-white",
  };
  return (
    <button
      className={`${className} glow-container rounded-full   ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </button>
  );
};

export default Button;
