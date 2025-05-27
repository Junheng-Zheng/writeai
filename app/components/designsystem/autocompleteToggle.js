import { useState } from "react";
const AutocompleteToggle = () => {
  const [isOn, setIsOn] = useState(false);
  return (
    <div className="flex flex-col relative">
      <div className="absolute top-0 right-0 -translate-y-full bg-white text-black/50 text-[14px] p-2 border border-black/10 border-b-0 w-fit rounded-t-[12px]">
        Autocomplete
      </div>
      <div className="w-[144px] relative  rounded-full rounded-tr-none border border-black/10 overflow-hidden flex">
        <div
          className={`absolute top-0 left-0 w-[50%] border-4 transition-all duration-200 ease-in-out border-white rounded-full h-full bg-black ${
            isOn ? "translate-x-full" : "translate-x-0"
          }`}
        ></div>
        <button
          onClick={() => setIsOn(!isOn)}
          className={`w-full cursor-pointer h-full py-[12px] z-10  flex items-center justify-center ${
            isOn ? "text-black/50" : "text-white"
          }`}
        >
          On
        </button>
        <button
          onClick={() => setIsOn(!isOn)}
          className={`w-full cursor-pointer h-full py-[12px] z-10  flex items-center justify-center ${
            isOn ? "text-white" : "text-black/50"
          }`}
        >
          Off
        </button>
      </div>
    </div>
  );
};

export default AutocompleteToggle;
