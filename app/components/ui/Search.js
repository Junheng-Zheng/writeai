import React from "react";

const Search = ({
  value,
  onChange,
  placeholder,
  className,
  symbol = "Search",
  onClick,
}) => {
  return (
    <div
      className={`relative border-[1px] border-black/20 rounded-full w-full py-[12px] px-[24px] flex ${className} `}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="outline-none w-full text-black bg-transparent placeholder:text-black/30"
      />
      <button className="cursor-pointer" onClick={onClick}>
        {symbol === "Search" && (
          <i className="fa-solid fa-magnifying-glass"></i>
        )}
        {symbol === "Add" && <i className="fa-solid  fa-plus"></i>}
      </button>
    </div>
  );
};
export default Search;
