import React from "react";

const Button = ({
  children,
  className,
  size,
  variant,
  arrow = true,
  onClick,
}) => {
  const sizeStyles = {
    small: "py-[12px] text-[14px] px-[24px]",
    medium: "py-[12px] text-[16px] px-[24px]",
    large: "py-[12px] text-[18px] px-[24px]",
  };
  const variantStyles = {
    primary:
      "bg-[rgb(157,255,0)] border border-black/30 text-black hover:bg-purple-400 hover:text-white",
    secondary: "bg-black text-white hover:bg-purple-400 hover:text-white",
    tertiary: "bg-white text-black border border-black/10 hover:bg-gray-100",
  };
  return (
    <button
      onClick={onClick}
      className={`${className} glow-container justify-center rounded-full flex items-center  gap-[8px]    ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
      {arrow && <span className="text-[16px] font-inter">{"->"}</span>}
    </button>
  );
};

export default Button;
