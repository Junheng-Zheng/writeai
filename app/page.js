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
        <div className="sm:p-[48px] flex-1 w-full">
          <div className="rainbow-linear px-[24px] py-[48px] pb-[0px] w-full flex flex-col sm:p-[96px] sm:pb-[0px] items-center gap-[24px] sm:gap-[48px] h-full sm:rounded-[24px]">
            <div className="flex w-full flex-col h-full justify-center items-center gap-[24px] sm:gap-[16px]">
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
                className=" sm:font-semibold font-medium sm:text-[64px] text-center text-[36px] text-black !leading-[1.2] tracking-[-1.2px]"
              >
                WRITING + AI FOR STUDENTS
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="sm:text-[21px] text-[18px] text-center !leading-[1.2] text-black"
              >
                Autocomplete. Real-time Collaboration. Undetectable - Say
                goodbye to docs.
              </motion.p>
              <div className="sm:flex-row flex-col flex h-fit justify-end items-center gap-[16px]">
                <motion.div
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
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Link href="https://us-east-2wosz12rja.auth.us-east-2.amazoncognito.com/signup?client_id=7vb6ksijcjvgve65fs0htb9ao4&redirect_uri=https%3A%2F%2Fwriteai-five.vercel.app%2Fdashboard&response_type=code&scope=email+openid+phone+profile">
                    <Button
                      size="large"
                      variant="primary"
                      className="w-[175px]"
                    >
                      Sign up
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <img
                src="https://media.discordapp.net/attachments/1048639613876568134/1376234939581857963/image.png?ex=6834962a&is=683344aa&hm=ff67dc125d440571b93dace569c5d4d9fe65e9175a2269d0f10871d7d7310833&=&format=webp&quality=lossless&width=2676&height=1444"
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
