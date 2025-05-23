import Search from "../ui/Search";
import Button from "./button";
import Link from "next/link";

const FloatingHeader = () => {
  return (
    <div className="z-20 w-full p-[24px] h-fit">
      <div className=" border-r border-t bg-white items-center border-white/20 py-[16px] px-[24px] rounded-[24px] flex w-full justify-between">
        <div className="w-full">
          <div className="text-[16px] w-[40px] flex items-center justify-center rainbow-radial aspect-square rounded-full font-bold ">
            W
          </div>
        </div>
        {/* <button className="text-[18px] py-[12px] px-[24px] border border-white  rounded-full">
              <p>View Demo {"->"}</p>
            </button> */}
        {/* <Search placeholder={"Search"} className="sm:flex hidden text-[14px]" /> */}
        <div className="sm:flex hidden  items-center w-full gap-[36px] justify-end">
          <p>About</p>
          <p>Contact</p>
          <Link href="https://us-east-2wosz12rja.auth.us-east-2.amazoncognito.com/login/continue?client_id=7vb6ksijcjvgve65fs0htb9ao4&redirect_uri=https%3A%2F%2Fwriteai-five.vercel.app%2Fdashboard&response_type=code&scope=email+openid+phone">
            <Button size="medium" variant="secondary">
              Login
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
  );
};

export default FloatingHeader;
