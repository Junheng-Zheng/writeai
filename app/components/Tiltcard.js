import { Tilt } from "react-tilt";

const defaultOptions = {
  reverse: false,
  max: 35,
  perspective: 1000,
  scale: 1,
};
const Tiltcard = ({
  tagName,
  title,
  description,
  icon,
  buttonText,
  tagColor,
  tagBgColor,
}) => {
  return (
    <Tilt
      options={defaultOptions}
      className="w-full aspect-10/9 text-white flex shadow-md border backdrop-blur-lg border-white/10 shadow-black/10 flex-col gap-[16px] p-[24px] rounded-[12px] justify-between overflow-hidden bg-black/30"
    >
      <div className="w-full justify-between flex items-center">
        <div
          className={`${tagBgColor} px-[12px] py-[4px] text-[14px] rounded-[4px]`}
        >
          <p className={`${tagColor}`}>{tagName}</p>
        </div>
        <div className="w-[35px] h-[35px] bg-white/10 border-t border-r border-white/10 text-white rounded-[4px] flex items-center justify-center">
          <i className="text-[16px]">{icon}</i>
        </div>
      </div>
      <div className="flex flex-col gap-[16px]">
        <h1 className="text-[21px] font-semibold">{title}</h1>
        <p className="text-[14px]">{description}</p>
        <div className="flex w-full justify-end items-center gap-[12px]">
          <button className="border cursor-pointer hover:bg-black/80 transition-all duration-300 border-black/10 w-full bg-black/30 py-[12px] text-[14px] px-[24px]  rounded-lg">
            <p>{buttonText}</p>
          </button>
        </div>
      </div>
    </Tilt>
  );
};
export default Tiltcard;
