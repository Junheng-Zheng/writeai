import { useState } from "react";
import Button from "./button";
import Link from "next/link";
const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[48px] h-[48px] aspect-square bg-black/5 cursor-pointer rounded-full"
      ></button>
      {isOpen && (
        <div className="absolute bottom-0 flex flex-col translate-y-full px-[12px]  right-0 w-[240px] h-fit bg-white shadow-md rounded-lg">
          <div className="px-[12px] flex flex-col gap-[12px] py-[24px] border-l border-r border-black/10">
            <div className="flex gap-[8px] flex-col">
              <p className="text-[16px] font-medium">John Doe</p>
              <p className="text-[14px] text-black/50">john.doe@example.com</p>
            </div>
            <Link href="/Settings">
              <p className="text-[16px]">Account Settings</p>
            </Link>
            <Button size="small" variant="tertiary" arrow={false}>
              Logout
            </Button>
            <Button size="small" variant="secondary" arrow={false}>
              Upgrade to Pro +
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
