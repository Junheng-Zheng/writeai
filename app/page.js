"use client";
import Payment from "./components/sections/Payment";
import Whyus from "./components/sections/Whyus";
import Hero from "./components/sections/Hero";
import Buttonarrow from "./components/ui/Buttonarrow";
import Navbar from "./components/navigation/Navbar";
const Page = () => {
  return (
    <>
      {/* <Hero />
      <Whyus /> */}
      {/* <div className="relative w-full flex flex-col gap-[var(--space-50)] px-[var(--space-150)] py-[var(--space-50)] mb-[-100px] bg-white">
        <img
          src="/assets/noise.jpeg"
          alt="landingbg"
          className="absolute top-0 left-0 w-full h-full opacity-5 object-cover"
        />
        <div className="z-200 flex gap-[var(--space-20)] items-center w-full">
          <div className="flex flex-col gap-[var(--space-20)] w-full">
            <div className="flex gap-[var(--space-8)] items-center">
              <h4 className="text-[55px] font-semibold text-nowrap blue-gradient">
                Say Goodbye To Docs
              </h4>
            </div>
            <p className="text-[21px] font-[505]">
              Everything you can do in docs, better. collaborate with others,
              save to google drive.
            </p>
          </div>
          <div className="w-full flex justify-end">
            <Buttonarrow variant="secondary">Write Now</Buttonarrow>
          </div>
        </div>
        <div className="w-full overflow-hidden rounded-t-[var(--radius-20)]  glow-container">
          <img
            src="/assets/example.png"
            alt="example"
            className="object-cover w-full rounded-[var(--radius-20)]"
          />
        </div>
      </div> */}
      {/* <Payment /> */}
      <div className="w-full h-[100vh] px-[28px] flex flex-col items-center justify-center updatedbg ">
        <div className="w-full h-full absolute top-0 left-0">
          <img
            src="/assets/noise.jpeg"
            alt="landingbg"
            className="absolute top-0 left-0 w-full h-full opacity-3 object-cover"
          />
        </div>
        <div className="w-full absolute top-0 left-0 p-[24px] h-fit">
          <div className="bg-black/30 border-r border-t items-center border-white/20 py-[16px] px-[24px] rounded-[26px] flex w-full justify-between">
            <img
              src="/assets/icon.png"
              alt="logo"
              className="w-[45px] aspect-square object-contain rounded-[12px]"
            />
            {/* <button className="text-[18px] py-[12px] px-[24px] border border-white text-white rounded-full">
              <p>View Demo {"->"}</p>
            </button> */}
            <div className="flex w-[24px] flex-col items-center gap-[7px]">
              <hr className="w-full h-[3px] rounded-full bg-white" />
              <hr className="w-full h-[3px] rounded-full bg-white" />
              <hr className="w-full h-[3px] rounded-full bg-white" />
            </div>
          </div>
        </div>
        <div className="z-20 w-full sm:w-fit gap-[16px] flex flex-col h-fit">
          <div className="flex items-center gap-[16px] p-[8px] w-[200px] text-white bg-white/10 rounded-full justify-center">
            <p className="text-[14px]">AI-Autocomplete</p>
            <i className="fa-solid fa-pencil"></i>
          </div>
          <h1 className="text-[42px] font-semibold text-white leading-[1.2] tracking-[-1.6%]">
            WRITING + AI
          </h1>
          <p className="text-[18px]  leading-[1.2] text-white">
            Write better, faster, and more efficiently with AI assistance.
          </p>
          <div className="flex w-full h-fit justify-end items-center gap-[16px]">
            <button className="p-[12px] pl-[11px] pr-[13px] font-regular bg-white/20  flex items-center justify-center text-black rounded-full">
              <i className="text-white/30 fa-solid fa-play"></i>
            </button>
            <button className=" py-[12px] text-[18px] px-[24px]  bg-white text-black rounded-full">
              <p>{"Join Waitlist ->"}</p>
            </button>
          </div>
        </div>
        <div className="absolute text-white bottom-[24px] animate-bounce items-center gap-[4px] flex flex-col">
          <p className="text-[18px] font-medium">Learn More</p>
          <i className="text-[18px] fa-solid fa-chevron-down"></i>
        </div>
      </div>
    </>
  );
};

export default Page;
