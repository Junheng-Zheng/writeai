import React from "react";

const Button = ({ children, size, variant, onClick, className }) => {
  const sizeStyles = {
    sm: [
      "cursor-pointer rounded-full px-[var(--space-40)] py-[var(--space-14)] font-[500] text-[16px] blue-gradient-bg text-white",
    ],
    md: [
      "rounded-full px-[var(--space-50)] py-[14.5px] font-[500] text-[16px] blue-gradient-bg text-white",
    ],
    lg: [
      "rounded-full px-[var(--space-50)] py-[var(--space-15)] font-[500] text-[18px] blue-gradient-bg text-white",
    ],
  };
  const variantStyles = {
    primary: "blue-gradient-bg text-white",
    secondary:
      "whitegradient-bg border-[1px] border-[var(--color-light-blue)] blue",
  };
  return (
    <button
      onClick={onClick}
      className={`${className} ${sizeStyles[size]} ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
