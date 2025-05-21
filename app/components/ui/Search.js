import React from "react";

const Search = ({ value, onChange, placeholder, className }) => {
  return (
    <div
      className={`${className} relative border-[1px] border-black/20 rounded-full w-full bg-black/40 px-[var(--space-20)] flex py-[var(--space-14)]`}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="outline-none w-full text-white bg-transparent placeholder:text-white/30"
      />
      <button className="cursor-pointer">
        <i className="fa-solid text-white/90 fa-magnifying-glass"></i>
      </button>
    </div>
  );
};
export default Search;
