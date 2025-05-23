import Link from "next/link";
const Footer = () => {
  return (
    <div className="w-full sm:flex hidden flex-col">
      <div className="w-full p-[48px] flex justify-between  border-t border-black/10">
        <div className="w-full  flex flex-col gap-[24px]">
          <div className="flex items-center gap-[16px]">
            <div className="text-[21px] w-[56px] flex items-center justify-center rainbow-radial aspect-square rounded-full font-bold ">
              W
            </div>
            <span className="text-[64px] font-semibold">WRITELY.WORK</span>
          </div>
          <p className="text-[14px]">
            Writely is a AI writing platform that helps you write better
            content.
          </p>
        </div>
        <div className="text-[14px] w-full flex ">
          <div className="w-full flex flex-col items-left gap-[16px]">
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
            <Link href="/">Terms of Service</Link>
            <Link href="/">Privacy Policy</Link>
          </div>
          <div className="w-full flex flex-col items-left gap-[16px]">
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
            <Link href="/">Terms of Service</Link>
            <Link href="/">Privacy Policy</Link>
          </div>
          <div className="w-full flex flex-col items-left gap-[16px]">
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
            <Link href="/">Terms of Service</Link>
            <Link href="/">Privacy Policy</Link>
          </div>
        </div>
      </div>
      <div className="text-[14px] w-full p-[48px] flex justify-between ">
        <div className="w-full flex flex-col ">
          <div className="flex items-center p-[12px] px-[16px] rounded-full border border-black/10 w-fit bg-gray-100 gap-[12px]">
            <i className="fa-solid fa-circle glow-container text-[rgb(54,222,48)] text-yellow-500"></i>
            {/* <p>All systems operational</p> */}
            Writely in development
          </div>
        </div>
        <div className="w-full flex justify-end gap-[36px]">
          <p>© 2025 Writely.work | All rights reserved</p>
          <Link href="/">Powered by Writely</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
