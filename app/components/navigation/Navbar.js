import React from "react";
import Button from "../ui/Button";

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 sm:relative  sm:bg-white z-2000 w-full flex justify-between items-center px-[var(--space-25)] py-[var(--space-30)]">
      <div className="flex items-center gap-[var(--space-5)]">
        <img src="/assets/icon.png" alt="logo" className="w-[30px] h-[30px]" />
        <h1 className="font-bold">
          <p className="blue-gradient">Writely</p>
        </h1>
      </div>
      <div className="hidden sm:flex items-center gap-[var(--space-25)]">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <Button size="sm" variant="primary">
          Sign Up
        </Button>
      </div>
      <div className="sm:hidden flex items-center gap-[var(--space-25)]">
        <i className="text-black text-[25px] fa-solid fa-bars"></i>
      </div>
    </div>
  );
};

export default Navbar;
