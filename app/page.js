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
const Page = () => {
  return (
    <>
      <FloatingHeader />
      <div className="w-full h-fit flex flex-col items-center justify-center bg-white ">
        <div className="p-[24px] flex-1 w-full">
          <div className="rainbow-radial w-full flex flex-col p-[72px] pb-[0px] items-start gap-[48px] h-full rounded-[24px]">
            <div className="flex w-full flex-col h-full justify-center items-center gap-[16px]">
              {/* <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-[16px] p-[8px] w-[180px] text-white rounded-lg rainbow-radial justify-center"
              >
                <p className="text-[14px]">AI-Autocomplete</p>
                <i className="text-[14px] fa-solid fa-pencil"></i>
              </motion.div> */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Tag />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className=" font-semibold text-[64px] text-black !leading-[1.2] tracking-[-1.2px]"
              >
                WRITING + AI FOR STUDENTS
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="text-[21px]  !leading-[1.2] text-black"
              >
                Autocomplete. Real-time Collaboration. Undetectable - Say
                goodbye to docs.
              </motion.p>
              <div className="flex h-fit justify-end items-center gap-[16px]">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Button
                    size="large"
                    variant="secondary"
                    className="w-[175px]"
                  >
                    {"View Demo"}
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Button size="large" variant="primary" className="w-[175px]">
                    Sign up
                  </Button>
                </motion.div>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <img
                src="/assets/example.png"
                alt="example"
                className="object-cover w-[70%] h-full object-top rounded-t-[12px]"
              />
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ amount: 0.2 }}
      >
        <InfoContent title={"AI-Autocomplete"} className="border-t">
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
      <div className="p-[48px] w-full h-fit">
        <div className="p-[48px] rainbow-radial w-full h-full rounded-[24px]">
          <div className="flex flex-col gap-[24px]">
            <div className="w-full h-fit grid  border-black/10 grid-cols-4  gap-[36px]">
              <Tiltcard
                tagName={"AI"}
                title={"AI-Autocomplete"}
                description={
                  "You write, AI finish, AI autocomplete, only on writely"
                }
                buttonText={"Explore Writely "}
                icon={<i className="text-[21px] fa-solid fa-pencil"></i>}
                tagColor={"text-purple-500"}
                tagBgColor={"bg-purple-500/30"}
                delay={0.1}
              />
              <Tiltcard
                tagName={"Collaboration"}
                title={"Work with others"}
                description={
                  "Collaborate with others in real-time, only on writely"
                }
                buttonText={"Explore Writely "}
                icon={<i className="text-[21px] fa-solid fa-users"></i>}
                tagColor={"text-blue-500"}
                tagBgColor={"bg-blue-500/30"}
                delay={0.2}
              />
              <Tiltcard
                tagName={"Reference"}
                title={"Add References"}
                description={"Add references to your writing, only on writely"}
                buttonText={"Explore Writely "}
                icon={<i className="text-[21px] fa-solid fa-quote-left"></i>}
                tagColor={"text-green-500"}
                tagBgColor={"bg-green-500/30"}
                delay={0.3}
              />
              <Tiltcard
                tagName={"Past Work"}
                title={"Add past work"}
                description={"Add past work to your writing, only on writely"}
                buttonText={"Explore Writely "}
                icon={<i className="text-[21px] fa-solid fa-file-lines"></i>}
                tagColor={"text-yellow-500"}
                tagBgColor={"bg-yellow-500/30"}
                delay={0.4}
              />
              <Tiltcard
                tagName={"AI"}
                title={"AI-Autocomplete"}
                description={
                  "You write, AI finish, AI autocomplete, only on writely"
                }
                buttonText={"Explore Writely "}
                icon={<i className="text-[21px] fa-solid fa-pencil"></i>}
                tagColor={"text-purple-500"}
                tagBgColor={"bg-purple-500/30"}
                delay={0.1}
              />
              <Tiltcard
                tagName={"Collaboration"}
                title={"Work with others"}
                description={
                  "Collaborate with others in real-time, only on writely"
                }
                buttonText={"Explore Writely "}
                icon={<i className="text-[21px] fa-solid fa-users"></i>}
                tagColor={"text-blue-500"}
                tagBgColor={"bg-blue-500/30"}
                delay={0.2}
              />
              <Tiltcard
                tagName={"Reference"}
                title={"Add References"}
                description={"Add references to your writing, only on writely"}
                buttonText={"Explore Writely "}
                icon={<i className="text-[21px] fa-solid fa-quote-left"></i>}
                tagColor={"text-green-500"}
                tagBgColor={"bg-green-500/30"}
                delay={0.3}
              />
              <Tiltcard
                tagName={"Past Work"}
                title={"Add past work"}
                description={"Add past work to your writing, only on writely"}
                buttonText={"Explore Writely "}
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
