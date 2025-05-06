import React from "react";

const Search = ({ value, onChange, placeholder, className }) => {
  return (
    <div className="relative border-[1px] border-black/20 rounded-full px-[var(--space-20)] flex py-[var(--space-14)]">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${className} outline-none placeholder:font-[550] w-full placeholder:text-black/30`}
      />
      <button className="cursor-pointer">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
};
export default Search;
