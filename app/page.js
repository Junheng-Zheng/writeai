"use client";
import Payment from "./components/sections/Payment";
import Whyus from "./components/sections/Whyus";
import Hero from "./components/sections/Hero";
import Buttonarrow from "./components/ui/Buttonarrow";
import Navbar from "./components/navigation/Navbar";
import { motion } from "framer-motion";
import Search from "./components/ui/Search";
const Page = () => {
  return (
    <>
      <div className="w-full h-[100vh] px-[28px] flex flex-col items-center justify-center updatedbg ">
        <div className="w-full h-full absolute top-0 left-0">
          <div className="w-full z-10 h-full bg-white/0 absolute top-0 left-0"></div>
          <img
            src="/assets/noise.jpeg"
            alt="landingbg"
            className="absolute top-0 left-0 w-full h-full opacity-3 object-cover"
          />
        </div>
        <div className="z-20 w-full absolute top-0 left-0 p-[24px] h-fit">
          <div className="bg-black/20 border-r border-t items-center border-white/20 py-[16px] px-[24px] rounded-[16px] flex w-full justify-between">
            <div className="w-full">
              <img
                src="/assets/icon.png"
                alt="logo"
                className="w-[45px] aspect-square object-contain rounded-[8px]"
              />
            </div>
            {/* <button className="text-[18px] py-[12px] px-[24px] border border-white text-white rounded-full">
              <p>View Demo {"->"}</p>
            </button> */}
            <Search placeholder={"Search"} className="sm:flex hidden" />
            <div className="sm:flex hidden text-white items-center w-full gap-[24px] justify-end">
              <p>About</p>
              <p>Contact</p>
              <button className="py-[12px] text-[16px] px-[24px] glow-container text-white border border-white/30 rounded-lg">
                <p>View Demo</p>
              </button>
            </div>
            <div className="flex w-[24px] sm:hidden flex-col items-center gap-[7px]">
              <hr className="w-full h-[3px] rounded-full bg-white" />
              <hr className="w-full h-[3px] rounded-full bg-white" />
              <hr className="w-full h-[3px] rounded-full bg-white" />
            </div>
          </div>
        </div>
        <div className="z-20 w-full sm:w-fit gap-[16px] flex flex-col h-fit">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-[16px] p-[8px] w-[180px] text-white rounded-lg bg-black/30 justify-center"
          >
            <p className="text-[14px]">AI-Autocomplete</p>
            <i className="text-[14px] fa-solid fa-pencil"></i>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-[42px] font-semibold text-white !leading-[1.2] tracking-[-1.2px]"
          >
            WRITING + AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-[16px] !leading-[1.2] text-white"
          >
            Autocomplete. Real-time Collaboration. Undetectable - Say goodbye to
            docs.
          </motion.p>
          <div className="flex w-full h-fit justify-end items-center gap-[16px]">
            {/* <button className="p-[12px] pl-[11px] pr-[13px] font-regular bg-white/20  flex items-center justify-center text-black rounded-full">
              <i className="text-white/30 fa-solid fa-play"></i>
            </button> */}
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="sm:flex hidden py-[12px] text-[16px] px-[24px]  bg-black/30 text-white border border-white/10 rounded-lg"
            >
              <p>{"View Demo"}</p>
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="glow-container py-[12px] text-[16px] px-[24px]  bg-white  text-black rounded-lg"
            >
              <p>{"Join Waitlist ->"}</p>
            </motion.button>
          </div>
        </div>
        {/* <div className="absolute text-white/80 bottom-[24px] animate-bounce items-center gap-[4px] flex flex-col">
          <p className="text-[18px]">Learn More</p>
          <i className="text-[18px] fa-solid fa-chevron-down"></i>
        </div> */}
      </div>
      <div className="w-full h-fit flex bg-white text-black gap-[16px] sm:px-[400px] sm:py-[48px] flex-col p-[24px]">
        <h1 className="text-[32px] !leading-[1.1] !tracking-[-1.1px] font-medium text-black">
          <strong>#1 </strong>Platform for all your writing needs.
        </h1>
        <p className="text-[16px] !leading-[1.2] !tracking-[2%] text-right text-black/80">
          Goodbye Docs & Grammarly. Hello Writely. Add references, stylize with
          AI, and collaborate with others.
        </p>

        <motion.div
          initial={{ y: 50 }}
          whileInView={{
            y: 0,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 15,
            },
          }}
          viewport={{ once: true }}
          className="p-[24px] updatedbg rounded-[24px] bg-black/10 flex w-full justify-between gap-[12px]"
        >
          <button className="bg-white/10 w-fit py-[12px] text-[16px] px-[24px] text-white rounded-lg">
            <p>{"Explore Writely ->"}</p>
          </button>
          <button className="p-[12px] pl-[11px] pr-[13px] font-regular bg-white/10 flex items-center justify-center text-black rounded-full">
            <i className="text-white fa-solid fa-play"></i>
          </button>
        </motion.div>
      </div>
      <div className="updatedbg sm:px-[400px] sm:pt-[48px] relative flex flex-col gap-[16px] text-white text-left p-[24px] pb-0 ">
        <div className="w-full h-full absolute top-0 left-0">
          <div className="w-full z-0 h-full bg-white/0 absolute top-0 left-0"></div>
          <img
            src="/assets/noise.jpeg"
            alt="landingbg"
            className="absolute top-0 left-0 w-full h-full opacity-5 object-cover"
          />
        </div>
        <div className="flex z-20 items-center gap-[12px]">
          <img
            src="/assets/icon.png"
            alt="logo"
            className="w-[36px] aspect-square object-contain rounded-[8px]"
          />
          <h2 className="text-[24px] !leading-[1.2] !tracking-[20%] font-medium ">
            AI-Autocomplete
          </h2>
        </div>
        <p className="text-[14px] z-20 !leading-[1.2] !tracking-[2%]">
          Autocomplete your writing. Add source references and stylize with your
          past work.
        </p>
        <div className="flex w-full z-20 justify-end">
          <button className="border border-white/20 w-fit py-[12px] text-[16px] px-[24px] text-white rounded-lg">
            <p>{"Explore Writely ->"}</p>
          </button>
        </div>
        <div className="z-20 h-fit w-full relative">
          <img
            src="/assets/example.png"
            alt="example"
            className=" object-cover w-full h-[200px] object-left rounded-[12px]"
          />
          <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-[12px] pl-[11px] pr-[13px] font-regular bg-black/20 backdrop-blur-sm flex items-center justify-center text-white rounded-full">
            <i className="text-white fa-solid fa-play"></i>
          </button>
        </div>
        <div className="z-20 bg-black/40 p-[12px] justify-center rounded-t-[12px] flex items-center gap-[12px]">
          <i className="text-[8px] text-white fa-solid fa-circle"></i>
          <i className="text-[8px] text-white/50 fa-solid fa-circle"></i>
          <i className="text-[8px] text-white/50 fa-solid fa-circle"></i>
        </div>
      </div>
      {/* <Whyus /> */}
      {/* <Payment /> */}
    </>
  );
};

export default Page;

{
  /* <Hero />
      <Whyus /> */
}
{
  /* <div className="relative w-full flex flex-col gap-[var(--space-50)] px-[var(--space-150)] py-[var(--space-50)] mb-[-100px] bg-white">
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
      </div> */
}
{
  /* <Payment /> */
}
