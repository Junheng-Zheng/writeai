import React from "react";

const Search = ({
  value,
  onChange,
  placeholder,
  className,
  symbol = "Search",
}) => {
  return (
    <div
      className={`${className} relative border-[1px] border-black/20 rounded-full w-full  px-[24px] flex py-[12px]`}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="outline-none w-full text-black bg-transparent placeholder:text-black/30"
      />
      <button className="cursor-pointer">
        {symbol === "Search" && (
          <i className="fa-solid  fa-magnifying-glass"></i>
        )}
        {symbol === "Add" && <i className="fa-solid  fa-plus"></i>}
      </button>
    </div>
  );
};
export default Search;
