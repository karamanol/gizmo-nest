"use client";

import { useState, ReactNode } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { cn } from "@/lib/cn";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type DropdownProps = {
  children: ReactNode;
  className?: string;
  text: string;
};
const Dropdown = ({ children, className, text }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { 0: parent } = useAutoAnimate({});

  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={cn(className)} ref={parent}>
      <div
        className="flex justify-start items-center gap-3 cursor-pointer"
        onClick={handleOpen}>
        <span className="font-semibold text-lg">{text || "Open"}</span>
        {isOpen ? (
          <IoIosArrowUp className="h-6 w-6" />
        ) : (
          <IoIosArrowDown className="h-6 w-6" />
        )}
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

export default Dropdown;
