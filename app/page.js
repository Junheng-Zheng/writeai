"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Search from "./components/ui/Search";
import Link from "next/link";
import { useRef } from "react";
import Payment from "./components/sections/Payment";
import Tiltcard from "./components/designsystem/Tiltcard";
import Button from "./components/designsystem/button";
import FloatingHeader from "./components/designsystem/floatingHeader";
import InfoContent from "./components/designsystem/infoContent";
import Footer from "./components/designsystem/footer";
import Tag from "./components/ui/Tag";
import { Tilt } from "react-tilt";
const Page = () => {
  return (
    <>
      <FloatingHeader />
      <div className="w-full h-fit flex flex-col items-center justify-center bg-white ">
        <div className=" flex-1 w-full">
          <div className="rainbow-linear px-[24px]  overflow-hidden py-[48px] pb-[0px] w-full flex flex-col sm:p-[48px] sm:pb-[0px] items-center gap-[24px] sm:gap-[28px] h-full ">
            <div className="flex w-[80%] flex-col h-full justify-start item-start py-[0px] sm:gap-[16px]">
              {/* <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Tag />
              </motion.div> */}
              <img
                src="/assets/icon.png"
                alt="Writo Logo"
                className="w-[64px] h-[64px] rounded-full"
              />
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className=" sm:font-bold font-medium sm:text-[64px] text-[36px] text-black !leading-[1.2] tracking-[-1.2px]"
              >
                Undetectable, Autocompleting AI Text Editor for Students.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="sm:text-[21px] text-[18px] !leading-[1.2] text-black"
              >
                Autocomplete. Real-time Collaboration. Undetectable - Say
                goodbye to docs.
              </motion.p>
              <div className="sm:flex-row flex-col flex h-fit justify-start items-center gap-[16px]">
                {/* <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="sm:block hidden"
                >
                  <Button
                    size="large"
                    variant="secondary"
                    className="w-[175px]"
                  >
                    {"View Demo"}
                  </Button>
                </motion.div> */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  {/* <Link href="https://us-east-2wosz12rja.auth.us-east-2.amazoncognito.com/signup?client_id=7vb6ksijcjvgve65fs0htb9ao4&redirect_uri=https%3A%2F%2Fwriteai-five.vercel.app%2Fdashboard&response_type=code&scope=email+openid+phone+profile">
                    <Button
                      size="large"
                      variant="primary"
                      className="w-[175px]"
                    >
                      Sign up
                    </Button>
                  </Link> */}
                  <button className="bg-[rgb(157,255,0)] group text-black  border border-black/20 px-[24px] text-[18px] py-[12px] rounded-full flex items-center gap-[12px]">
                    Sign up
                    <div className="w-[32px] h-[32px] bg-white rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-arrow-right text-[18px] -rotate-45 group-hover:rotate-0 transition-all duration-300"></i>
                    </div>
                  </button>
                </motion.div>
              </div>
            </div>
            <div className="flex w-full px-[48px] bottom-0 left-0 justify-center py-[24px] -gap-[48px]">
              <div className="hover:-translate-y-[28px] hover:scale-105 hover:-rotate-[4deg] transition-all duration-200 rotate-[2deg] w-full text-black flex shadow-md border backdrop-blur-sm border-black/5 shadow-black/10 flex-col gap-[64px] p-[24px] rounded-[12px] justify-between overflow-hidden bg-white/50">
                <div className=" w-full justify-between flex items-center">
                  <div
                    className={`border border-black/10 px-[12px] py-[4px] text-[14px] rounded-[4px]`}
                  >
                    <p className="font-light">{"Past Work"}</p>
                  </div>
                  <div className="w-[35px] h-[35px] rainbow-radial text-black rounded-[4px] flex items-center justify-center">
                    <i className="text-[16px]">
                      <i className="fa-solid fa-file-lines"></i>
                    </i>
                  </div>
                </div>
                <div className="flex flex-col gap-[16px]">
                  <h1 className="text-[21px] font-satoshi font-medium">
                    Stylize with past work
                  </h1>
                  <p className="text-[14px]">
                    Add past work to the dashboard. Writo auto-stylizes
                    everything in your style.
                  </p>
                </div>
              </div>
              <div className="hover:-translate-y-[28px] hover:scale-105 hover:-rotate-[-4deg] transition-all duration-200 -rotate-[2deg] w-full text-black flex shadow-md border backdrop-blur-sm border-black/5 shadow-black/10 flex-col gap-[64px] p-[24px] rounded-[12px] justify-between overflow-hidden bg-white/50">
                <div className=" w-full justify-between flex items-center">
                  <div
                    className={`border border-black/10 px-[12px] py-[4px] text-[14px] rounded-[4px]`}
                  >
                    <p className="font-light">{"Reference"}</p>
                  </div>
                  <div className="w-[35px] h-[35px] rainbow-radial text-black rounded-[4px] flex items-center justify-center">
                    <i className="text-[16px]">
                      <i className="fa-solid fa-quote-left"></i>
                    </i>
                  </div>
                </div>
                <div className="flex flex-col gap-[16px]">
                  <h1 className="text-[21px] font-satoshi font-medium">
                    Add source references
                  </h1>
                  <p className="text-[14px]">
                    Add references to the editor. Writo automatically sites
                    evidence as you write.
                  </p>
                </div>
              </div>
              <div className="hover:-translate-y-[28px] hover:scale-105 hover:-rotate-[4deg] transition-all duration-200 rotate-[2deg] w-full text-black flex shadow-md border backdrop-blur-sm border-black/5 shadow-black/10 flex-col gap-[64px] p-[24px] rounded-[12px] justify-between overflow-hidden bg-white/50">
                <div className=" w-full justify-between flex items-center">
                  <div
                    className={`border border-black/10 px-[12px] py-[4px] text-[14px] rounded-[4px]`}
                  >
                    <p className="font-light">{"AI"}</p>
                  </div>
                  <div className="w-[35px] h-[35px] rainbow-radial text-black rounded-[4px] flex items-center justify-center">
                    <i className="text-[16px]">
                      <i className="fa-solid fa-pencil"></i>
                    </i>
                  </div>
                </div>
                <div className="flex flex-col gap-[16px]">
                  <h1 className="text-[21px] font-satoshi font-medium">
                    {"AI-Autocomplete"}
                  </h1>
                  <p className="text-[14px]">
                    You write, Writo finishes. Autocomplete your writing in your
                    style.
                  </p>
                </div>
              </div>
              <div className="hover:-translate-y-[28px] hover:scale-105 hover:rotate-[4deg] transition-all duration-200 -rotate-[2deg] w-full text-black flex shadow-md border backdrop-blur-sm border-black/5 shadow-black/10 flex-col gap-[64px] p-[24px] rounded-[12px] justify-between overflow-hidden bg-white/50">
                <div className=" w-full justify-between flex items-center">
                  <div
                    className={`border border-black/10 px-[12px] py-[4px] text-[14px] rounded-[4px]`}
                  >
                    <p className="font-light">{"Collaboration"}</p>
                  </div>
                  <div className="w-[35px] h-[35px] rainbow-radial text-black rounded-[4px] flex items-center justify-center">
                    <i className="text-[16px]">
                      <i className="fa-solid fa-users"></i>
                    </i>
                  </div>
                </div>
                <div className="flex flex-col gap-[16px]">
                  <h1 className="text-[21px] font-satoshi font-medium">
                    Work with others
                  </h1>
                  <p className="text-[14px]">
                    Collaborate with others in real-time. Group projects, peer
                    reviews, and more.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <img
                src="assets/textEditor.png"
                alt="example"
                className="object-cover sm:w-[80%] sm:h-[300px] h-[200px] sm:object-top object-left-top  border border-black/10 border-b-0"
              />
            </div>
          </div>
        </div>
      </div>
      <InfoContent title={"AI-Autocomplete"} className="border-t">
        Autocomplete your writing. Add source references and stylize with your
        past work.
      </InfoContent>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ amount: 0.2 }}
      >
        <InfoContent title={"AI-Autocomplete"} position="left">
          Autocomplete your writing. Add source references and stylize with your
          past work.
        </InfoContent>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ amount: 0.2 }}
      >
        <InfoContent title={"AI-Autocomplete"}>
          Autocomplete your writing. Add source references and stylize with your
          past work.
        </InfoContent>
      </motion.div>
      <div className="sm:p-[48px] w-full h-fit">
        <div className="sm:p-[48px] px-[24px] py-[48px] rainbow-radial-animated w-full h-full sm:rounded-[24px]">
          <div className="flex flex-col gap-[24px]">
            <div className="w-full h-fit grid  border-black/10 sm:grid-cols-4 grid-cols-1 sm:gap-[36px] gap-[24px]">
              <Tiltcard
                tagName={"AI"}
                title={"AI-Autocomplete"}
                description={
                  "You write, AI finish, AI autocomplete, only on Writo"
                }
                buttonText={"Explore Writo "}
                icon={<i className="text-[21px] fa-solid fa-pencil"></i>}
                tagColor={"text-purple-500"}
                tagBgColor={"bg-purple-500/30"}
                delay={0.1}
              />
              <Tiltcard
                tagName={"Collaboration"}
                title={"Work with others"}
                description={
                  "Collaborate with others in real-time, only on Writo"
                }
                buttonText={"Explore Writo "}
                icon={<i className="text-[21px] fa-solid fa-users"></i>}
                tagColor={"text-blue-500"}
                tagBgColor={"bg-blue-500/30"}
                delay={0.2}
              />
              <Tiltcard
                tagName={"Reference"}
                title={"Add References"}
                description={"Add references to your writing, only on Writo"}
                buttonText={"Explore Writo "}
                icon={<i className="text-[21px] fa-solid fa-quote-left"></i>}
                tagColor={"text-green-500"}
                tagBgColor={"bg-green-500/30"}
                delay={0.3}
              />
              <Tiltcard
                tagName={"Past Work"}
                title={"Add past work"}
                description={"Add past work to your writing, only on Writo"}
                buttonText={"Explore Writo "}
                icon={<i className="text-[21px] fa-solid fa-file-lines"></i>}
                tagColor={"text-yellow-500"}
                tagBgColor={"bg-yellow-500/30"}
                delay={0.4}
              />
              <Tiltcard
                tagName={"AI"}
                title={"AI-Autocomplete"}
                description={
                  "You write, AI finish, AI autocomplete, only on Writo"
                }
                buttonText={"Explore Writo "}
                icon={<i className="text-[21px] fa-solid fa-pencil"></i>}
                tagColor={"text-purple-500"}
                tagBgColor={"bg-purple-500/30"}
                delay={0.1}
              />
              <Tiltcard
                tagName={"Collaboration"}
                title={"Work with others"}
                description={
                  "Collaborate with others in real-time, only on Writo"
                }
                buttonText={"Explore Writo "}
                icon={<i className="text-[21px] fa-solid fa-users"></i>}
                tagColor={"text-blue-500"}
                tagBgColor={"bg-blue-500/30"}
                delay={0.2}
              />
              <Tiltcard
                tagName={"Reference"}
                title={"Add References"}
                description={"Add references to your writing, only on Writo"}
                buttonText={"Explore Writo "}
                icon={<i className="text-[21px] fa-solid fa-quote-left"></i>}
                tagColor={"text-green-500"}
                tagBgColor={"bg-green-500/30"}
                delay={0.3}
              />
              <Tiltcard
                tagName={"Past Work"}
                title={"Add past work"}
                description={"Add past work to your writing, only on Writo"}
                buttonText={"Explore Writo "}
                icon={<i className="text-[21px] fa-solid fa-file-lines"></i>}
                tagColor={"text-yellow-500"}
                tagBgColor={"bg-yellow-500/30"}
                delay={0.4}
              />
            </div>
          </div>
        </div>
      </div>
      <Payment />
      <Footer />
    </>
  );
};

export default Page;
