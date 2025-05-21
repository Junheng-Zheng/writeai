"use client";
import React, { useState } from "react";

const Dropdown = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`cursor-pointer flex border-[1px] w-[200px] justify-center items-center font-[505] relative border-black/20 rounded-t-[var(--radius-20)]  transition-all duration-300 ${
        isOpen ? "rounded-b-[0px]" : "rounded-b-[var(--radius-20)]"
      } px-[var(--space-20)] py-[var(--space-12)] items-center gap-[var(--space-10)]`}
    >
      <p className="text-nowrap truncate">{selectedOption}</p>
      <button>
        <i
          className={`cursor-pointer text-[12px] transition-all duration-300 fa-solid fa-chevron-up ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
        ></i>
      </button>
      <div
        className={`absolute  outline-1 flex rounded-b-[var(--radius-20)] flex-col overflow-hidden left-0 w-full  top-full bg-white z-100 ${
          isOpen ? "[h-120px] outline-black/20" : "h-[0px] outline-none"
        }`}
      >
        {options.map((item, index) => (
          <p
            key={index}
            className={`bg-white hover:bg-black/5 px-[var(--space-20)] border-b-[1px] transition-all duration-300 border-black/20    text-black/50 ${
              isOpen ? "py-[var(--space-12)]" : "py-[0px]"
            }`}
            onClick={() => {
              setSelectedOption(item);
              onChange(item);
            }}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
