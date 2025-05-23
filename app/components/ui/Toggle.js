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
    <div className="rounded-full z-20 flex rainbow-radial p-[12px]">
      <button
        className={`${
          yearly ? "text-white " : "text-black bg-white"
        } px-[24px] py-[12px] rounded-full`}
        onClick={() => setYearly(false)}
      >
        <p>Monthly</p>
      </button>
      <button
        className={`${
          yearly ? "bg-white text-black" : "text-white"
        } px-[24px] py-[12px] rounded-full`}
        onClick={() => setYearly(true)}
      >
        <p>Yearly</p>
      </button>
    </div>
  );
};

export default Toggle;
