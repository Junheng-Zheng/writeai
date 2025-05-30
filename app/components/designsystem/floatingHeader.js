import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "./button";

const FloatingHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef(null);
  // Check if the website is being hosted locally
  const [isLocal, setIsLocal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    // Only runs on the client
    setIsLocal(
      window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
    );
  }, []);
  // Construct the URL based on environment
  const redirectUri = isLocal
    ? "http://localhost:3000/dashboard"
    : "https://writeai-five.vercel.app/dashboard";

  const loginUrl = `https://us-east-2wosz12rja.auth.us-east-2.amazoncognito.com/login/continue?client_id=7vb6ksijcjvgve65fs0htb9ao4&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=email+openid+phone+profile`;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className={`z-30 w-full sticky flex justify-center top-0 sm:p-[24px] py-[12px] border-b h-fit ${
        scrolled ? "bg-black/10 backdrop-blur-md" : "bg-transparent  "
      } transition-all duration-300`}
    >
      <div
        className={`border-r border-t bg-white transition-all duration-300 items-center border-white/20 py-[16px] px-[24px] rounded-[24px] flex justify-between ${
          scrolled ? "w-[90%]" : "w-full"
        }`}
      >
        <div className="w-full flex items-center gap-[12px]">
          {/* <div className="text-[16px] w-[40px] flex items-center justify-center rainbow-radial aspect-square rounded-full font-bold">
            W
          </div> */}
          <img
            src="/assets/icon.png"
            className="w-[40px] h-[40px] rounded-full"
          />
          <hr className="w-[1px] h-[28px] bg-black" />
          <span>WRITO</span>
        </div>
        {/* <button className="text-[18px] py-[12px] px-[24px] border border-white  rounded-full">
              <p>View Demo {"->"}</p>
            </button> */}
        {/* <Search placeholder={"Search"} className="sm:flex hidden text-[14px]" /> */}
        <div className="sm:flex hidden items-center w-full gap-[36px] justify-end">
          <p>About</p>
          <p>Pricing</p>
          <p>Contact</p>
          <Link href={loginUrl}>
            <Button size="medium" variant="secondary">
              Login
            </Button>
          </Link>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex w-[24px] sm:hidden flex-col items-center justify-center gap-[4px] relative h-[16px]"
        >
          <span
            className={`absolute w-full h-[2px] bg-black rounded-full transition-transform duration-300 ${
              menuOpen ? "rotate-45 top-1/2" : "top-0"
            }`}
          />
          {!menuOpen && (
            <span className="absolute w-full h-[2px] bg-black rounded-full transition-opacity duration-300" />
          )}
          <span
            className={`absolute w-full h-[2px] bg-black rounded-full transition-transform duration-300 ${
              menuOpen ? "-rotate-45 top-1/2" : "bottom-0"
            }`}
          />
        </button>
      </div>
      <div
        className={`absolute bottom-0  shadow shadow-black/20 border-black/10 overflow-hidden transition-all duration-300 translate-y-full left-0 w-full  bg-white/85 ${
          menuOpen ? "max-h-[50vh] backdrop-blur-md" : "max-h-0"
        }`}
      >
        <div className="p-[24px] border-b border-black/10">
          <p>About</p>
        </div>
        <div className="p-[24px] border-b border-black/10">
          <p>Pricing</p>
        </div>
        <div className="p-[24px] border-b border-black/10">
          <p>Contact</p>
        </div>
        <div className="p-[24px] border-b border-black/10">
          <p>Demo</p>
        </div>
        <div className="p-[24px]">
          <Link href={loginUrl}>
            <Button size="medium" variant="secondary" className="w-full">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FloatingHeader;
