"use client";
import { createContext, useContext, useState } from "react";

export const ToggleContext = createContext();

export const useToggle = () => useContext(ToggleContext);

export const ToggleProvider = ({ children }) => {
  const [yearly, setYearly] = useState(false);

  return (
    <ToggleContext.Provider value={{ yearly, setYearly }}>
      {children}
    </ToggleContext.Provider>
  );
};

const Toggle = () => {
  const { yearly, setYearly } = useToggle();

  return (
    <div className="rounded-full flex z-200 toggle-gradient-bg px-[var(--space-20)] py-[var(--space-15)] border-[0.5px] border-white items-center gap-[var(--space-10)]">
      <button
        className={`${
          yearly ? "text-white " : "whitegradient-bg text-black"
        } px-[var(--space-20)] py-[var(--space-12)] cursor-pointer rounded-full`}
        onClick={() => setYearly(false)}
      >
        <p>Monthly</p>
      </button>
      <button
        className={`${
          yearly ? "whitegradient-bg text-black" : "text-white"
        } px-[var(--space-20)] py-[var(--space-12)] cursor-pointer rounded-full`}
        onClick={() => setYearly(true)}
      >
        <p>Yearly</p>
      </button>
    </div>
  );
};

export default Toggle;
