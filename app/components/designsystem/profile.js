import { useState, useEffect } from "react";
import Button from "./button";
import Link from "next/link";
const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsOpen(false);
    });
  }, []);
  return (
    <div>
      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="absolute inset-0  h-[100dvh]"
        />
      )}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-[48px] h-[48px] aspect-square bg-black/5 cursor-pointer rounded-full"
        ></button>
        <div
          className={`absolute bottom-0 flex w-[296px] px-[16px] flex-col  h-fit translate-y-[calc(100%+12px)]  border  right-0  bg-white shadow-md rounded-lg ${
            isOpen
              ? "max-h-[460px] border-black/10"
              : "max-h-[0px] border-white"
          } transition-all duration-300 overflow-hidden`}
        >
          <div className="flex flex-col py-[16px] gap-[16px] border-l border-r border-black/10">
            <div className="flex px-[12px] gap-[8px] flex-col">
              <p className="text-[16px] font-medium">John Doe</p>
              <p className="text-[14px] text-black/50">john.doe@example.com</p>
            </div>
            <div className="flex flex-col">
              <Link
                href="/Settings"
                className="border-b border-t hover:bg-black/5 transition-all duration-300 border-black/10 p-[16px]"
              >
                <p className="text-[16px]">Account Settings</p>
              </Link>
              <Link
                href="/"
                className="border-b  hover:bg-black/5 transition-all duration-300 border-black/10 p-[16px]"
              >
                <p className="text-[16px]">Homepage</p>
              </Link>
            </div>
            <div className="flex px-[16px] flex-col gap-[16px]">
              <Button size="small" variant="tertiary" arrow={false}>
                Logout
              </Button>
              <Button size="small" variant="secondary" arrow={false}>
                Upgrade to Pro +
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
