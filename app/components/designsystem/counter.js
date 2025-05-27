import React, { useState, useRef, useEffect } from "react";

const Counter = ({ defaultCount = 12, className }) => {
  const [count, setCount] = useState(defaultCount);
  const [fontDropdown, setFontDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);
  const [dropdownHeight, setDropdownHeight] = useState(0);
  const fonts = [8, 9, 10, 11, 12, 14, 18, 24, 36, 48, 60, 72, 96];

  useEffect(() => {
    if (dropdownRef.current) {
      setDropdownHeight(dropdownRef.current.scrollHeight);
    }
  }, [fontDropdown]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setFontDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increaseCount = () => {
    if (count <= 400) {
      setCount(count + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || !isNaN(parseInt(value))) {
      setCount(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setFontDropdown(false);
      const value = parseInt(count);
      if (!isNaN(value)) {
        if (value >= 1 && value <= 400) {
          setCount(value);
        } else if (value < 1) {
          setCount(1);
        } else if (value > 400) {
          setCount(400);
        }
      } else {
        setCount(1);
      }
      e.target.blur();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${className} relative justify-center rounded-full flex items-center  gap-[8px]  bg-white text-black border border-black/10  py-[8px] text-[16px] px-[12px]`}
    >
      <button
        className="w-[24px] h-[24px] flex items-center justify-center rounded-full border border-black/10 hover:bg-gray-100"
        onClick={decreaseCount}
      >
        <i className="text-[14px] fa-solid fa-minus"></i>
      </button>
      <input
        className="text-[14px] w-[32px] outline-none flex items-center justify-center text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        value={count}
        onClick={() => setFontDropdown(true)}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={(e) => e.target.select()}
        onBlur={() => {
          if (count === "" || isNaN(parseInt(count))) {
            setCount(1);
          }
        }}
        min="1"
        max="400"
        type="number"
        tabIndex="-1"
      />
      <div
        ref={dropdownRef}
        className="absolute top-full flex flex-col left-1/2 -translate-x-1/2  bg-white shadow-md transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: fontDropdown ? `${dropdownHeight}px` : "0px",
        }}
      >
        {fonts.map((font, index) => (
          <button
            key={index}
            onClick={() => {
              setCount(font);
              setFontDropdown(false);
            }}
            className="py-[8px] border-b border-black/10 hover:bg-gray-100 px-[12px] text-[14px]"
          >
            {font}
          </button>
        ))}
      </div>

      <button
        className="w-[24px] h-[24px] flex items-center justify-center rounded-full border border-black/10 hover:bg-gray-100"
        onClick={increaseCount}
      >
        <i className="text-[14px] fa-solid fa-plus"></i>
      </button>
    </div>
  );
};

export default Counter;
