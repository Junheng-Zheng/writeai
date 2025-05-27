import { useState } from "react";
import Button from "./button";
const FontFamilyDropdown = ({ defaultFont = "Inter" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [font, setFont] = useState(defaultFont);
  const Fonts = [
    "Inter",
    "Arial",
    "Times New Roman",
    "Helvetica",
    "Georgia",
    "Garamond",
    "Palatino",
    "Bookman",
    "Comic Sans MS",
    "Courier New",
    "Lucida Console",
    "Monaco",
    "Trebuchet MS",
    "Verdana",
    "Georgia",
    "Garamond",
  ];
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`text-black cursor-pointer relative  flex transition-all duration-300 items-center gap-[12px] border border-black/10 px-[16px] py-[8px] ${
        isOpen ? "bg-gray-100 rounded-t-[16px]" : "rounded-[24px]"
      }`}
    >
      <div className="w-[64px] text-center  truncate">{font}</div>
      <button className="border w-[24px] h-[24px] border-black/10 rounded-full flex items-center justify-center">
        <i
          className={`text-[12px] ${
            isOpen ? "rotate-180" : ""
          } fa-solid fa-chevron-down transition-transform duration-300`}
        ></i>
      </button>

      <div
        className={`absolute top-full left-0 bg-white border  overflow-y-auto ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-[0px] opacity-0"
        } transition-all duration-300`}
      >
        <div className="border-b border-black/10 flex flex-col px-[12px] py-[12px] sticky top-0 bg-white">
          <Button
            variant="tertiary"
            size="small"
            arrow={false}
            className="w-full "
          >
            Add Font +
          </Button>
        </div>
        {Fonts.map((font, index) => (
          <button
            key={index}
            onClick={() => setFont(font)}
            className="border-b w-full text-left border-black/10 text-nowrap px-[24px] hover:bg-gray-100 py-[16px]"
            style={{ fontFamily: font }}
          >
            {font}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FontFamilyDropdown;
