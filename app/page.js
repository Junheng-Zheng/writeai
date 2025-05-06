"use client";
import Payment from "./components/sections/Payment";
import Whyus from "./components/sections/Whyus";
import Hero from "./components/sections/Hero";
import Buttonarrow from "./components/ui/Buttonarrow";
const Page = () => {
  return (
    <>
      <Hero />
      <Whyus />
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
      <Payment />
    </>
  );
};

export default Page;
