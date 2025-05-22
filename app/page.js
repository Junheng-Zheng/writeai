"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Search from "./components/ui/Search";
import Link from "next/link";
import { useRef } from "react";
import Payment from "./components/sections/Payment";
import Tiltcard from "./components/Tiltcard";
import Button from "./components/designsystem/button";
const Page = () => {
  return (
    <>
      <div className="w-full h-[100vh] px-[28px] flex flex-col items-center justify-center updatedbg ">
        {/* <div className="w-full h-full absolute top-0 left-0">
            <div className="w-full z-10 h-full bg-white/0 absolute top-0 left-0"></div>
            <img
              src="/assets/noise.jpeg"
              alt="landingbg"
              className="absolute top-0 left-0 w-full h-full opacity-3 object-cover"
            />
          </div> */}
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
              <Link href="https://us-east-2wosz12rja.auth.us-east-2.amazoncognito.com/login/continue?client_id=7vb6ksijcjvgve65fs0htb9ao4&redirect_uri=https%3A%2F%2Fwriteai-five.vercel.app%2Fdashboard&response_type=code&scope=email+openid+phone">
                <Button variant="secondary">
                  <p>Login</p>
                </Button>
              </Link>
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
            className=" text-[42px] font-semibold text-white !leading-[1.2] tracking-[-1.2px]"
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
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Button variant="secondary">
                <p>{"View Demo"}</p>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Button variant="primary">
                <p>{"Join Waitlist ->"}</p>
              </Button>
            </motion.div>
          </div>
        </div>
        {/* <div className="absolute text-white/80 bottom-[24px] animate-bounce items-center gap-[4px] flex flex-col">
          <p className="text-[18px]">Learn More</p>
          <i className="text-[18px] fa-solid fa-chevron-down"></i>
        </div> */}
        {/* <div className="w-full h-fit translate-y-1/2 absolute bottom-0 left-0 hidden sm:flex justify-center">
          <div
            style={{
              perspective: 900,
            }}
            className="w-[80%] glow-container overflow-hidden rounded-t-[var(--radius-20)] sm:rounded-t-none"
          >
            <motion.img
              ref={imgRef}
              src="/assets/example.png"
              alt="example"
              className="rounded-[var(--radius-20)] h-[300px] object-top-left object-cover sm:h-auto sm:mx-auto sm:scale-100"
              style={{
                rotateX: imgRotateX,
                position: "relative",
                transformStyle: "preserve-3d",
                transformOrigin: "center bottom",
              }}
            />
          </div>
        </div> */}
      </div>
      {/* <div className="w-full h-fit flex bg-gray-300 text-black gap-[16px] sm:px-[400px] sm:py-[48px] flex-col p-[24px]">
        <h1 className="text-[32px]  font-semibold text-black">
          Platform for all your writing needs.
        </h1>
        <p className="text-[16px] font-mediumtext-right text-black/80">
          Goodbye Docs & Grammarly. Hello Writely. Add references, stylize with
          AI, and collaborate with others.
        </p>
        <button className="border border-black/20 w-fit py-[12px] text-[16px] px-[24px] text-black rounded-lg">
          <p>View Demo {"->"}</p>
        </button>
        
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
      </div> */}
      <div className="bg-gray-900 sm:px-[120px] py-[96px]  relative flex sm:flex-row flex-col gap-[24px] sm:gap-[48px] text-white text-left justify-end sm:items-center ">
        <div className="flex flex-col gap-[16px]">
          <div className="flex z-20 text-white items-center gap-[12px]">
            <img
              src="/assets/icon.png"
              alt="logo"
              className="w-[36px] aspect-square object-contain rounded-[4px]"
            />
            <h2 className="text-[32px] font-bold text-white">
              AI-Autocomplete
            </h2>
          </div>
          <p className="text-[18px] z-20 text-white">
            Autocomplete your writing. Add source references and stylize with
            your past work.
          </p>
          <div className="flex w-full z-20 justify-start">
            <Button variant="primary">
              <p>{"Explore Writely ->"}</p>
            </Button>
          </div>
        </div>
        <div className="z-20 h-fit w-full relative">
          <img
            src="/assets/example.png"
            alt="example"
            className="object-cover w-full h-[300px] sm:h-[350px] object-top-left rounded-[12px]"
          />
          <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-[12px] pl-[11px] pr-[13px] font-regular bg-black/20 backdrop-blur-sm flex items-center justify-center text-white rounded-full">
            <i className="text-white fa-solid fa-play"></i>
          </button>
        </div>
      </div>
      <div className="w-full updatedbg flex flex-col p-[120px] border-t border-black/10  gap-[54px]">
        <div className="flex justify-between items-center  text-white">
          <div className="flex z-20 text-white w-full items-center gap-[12px]">
            <img
              src="/assets/icon.png"
              alt="logo"
              className="w-[36px] aspect-square object-contain rounded-[4px]"
            />
            <h2 className="text-[32px] font-bold text-white">
              Writely&apos;s Features
            </h2>
          </div>
          <p className="text-[18px] text-right">
            Truly enhance your writing with AI. Many of these features with more
            Coming soon
          </p>
        </div>
        <div className="w-full h-fit grid  border-black/10 grid-cols-4  gap-[24px]">
          <Tiltcard
            tagName={"AI"}
            title={"AI-Autocomplete"}
            description={
              "You write, AI finish, AI autocomplete, only on writely"
            }
            buttonText={"Explore Writely ->"}
            icon={<i className="text-[21px] fa-solid fa-pencil"></i>}
            tagColor={"text-purple-500"}
            tagBgColor={"bg-purple-500/30"}
          />
          <Tiltcard
            tagName={"Collaboration"}
            title={"Work with others"}
            description={
              "Collaborate with others in real-time, only on writely"
            }
            buttonText={"Explore Writely ->"}
            icon={<i className="text-[21px] fa-solid fa-users"></i>}
            tagColor={"text-blue-500"}
            tagBgColor={"bg-blue-500/30"}
          />
          <Tiltcard
            tagName={"Reference"}
            title={"Add References"}
            description={"Add references to your writing, only on writely"}
            buttonText={"Explore Writely ->"}
            icon={<i className="text-[21px] fa-solid fa-quote-left"></i>}
            tagColor={"text-green-500"}
            tagBgColor={"bg-green-500/30"}
          />
          <Tiltcard
            tagName={"Past Work"}
            title={"Add past work"}
            description={"Add past work to your writing, only on writely"}
            buttonText={"Explore Writely ->"}
            icon={<i className="text-[21px] fa-solid fa-file-lines"></i>}
            tagColor={"text-yellow-500"}
            tagBgColor={"bg-yellow-500/30"}
          />
        </div>
      </div>
      {/* <Payment /> */}
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
