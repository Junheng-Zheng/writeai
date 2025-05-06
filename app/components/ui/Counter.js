"use client";
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    setCount(count - 1);
  };
  return (
    <div className="flex border-[1px] border-black/20 rounded-full px-[var(--space-20)] py-[var(--space-12)] items-center gap-[var(--space-10)]">
      <button onClick={handleDecrement} className="cursor-pointer">
        <i className="fa-solid fa-minus"></i>
      </button>
      <p className="font-[505]">{count}</p>
      <button onClick={handleIncrement} className="cursor-pointer">
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
};

export default Counter;
