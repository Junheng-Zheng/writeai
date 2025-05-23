import Button from "./button";

const InfoContent = ({ title, children, position = "right", className }) => {
  return (
    <div
      className={`sm:px-[48px] px-[24px] border-b border-black/10 ${className}`}
    >
      <div
        className={`w-full border-l border-r border-black/10 sm:px-[48px] px-[24px] py-[48px] sm:py-[96px] gap-[24px] flex ${
          position === "right" ? "sm:flex-row" : "sm:flex-row-reverse"
        }   relative flex  flex-col sm:gap-[48px] text-white text-left justify-center sm:items-center `}
      >
        <div className="flex flex-col gap-[24px]">
          <div className="flex text-black items-center gap-[12px]">
            <div className="text-[16px] w-[40px] flex items-center justify-center rainbow-radial aspect-square rounded-full font-bold ">
              W
            </div>
            <h2 className="font-satoshi sm:text-[36px] text-[24px] font-bold text-black">
              {title}
            </h2>
          </div>
          <p className="text-[18px] text-black">{children}</p>
          <div className="flex w-full justify-start">
            <Button variant="secondary" size="medium">
              <p>{"Explore Writely"}</p>
            </Button>
          </div>
        </div>
        <div className=" h-fit w-full relative">
          <img
            src="/assets/example.png"
            alt="example"
            className="object-cover border border-black/10 w-full h-[300px] sm:h-[350px] object-top-left"
          />
          <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-[12px] pl-[11px] pr-[13px] font-regular bg-black/20 backdrop-blur-sm flex items-center justify-center text-white rounded-full">
            <i className="text-white fa-solid fa-play"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoContent;
