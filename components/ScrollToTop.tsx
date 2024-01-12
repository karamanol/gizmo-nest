"use client";

import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";
import { IoMdArrowDropupCircle } from "react-icons/io";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", toggleVisibility);
    }
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      className={cn(
        "hidden sm:block fixed z-[999] hover:scale-110 transition-all duration-500 drop-shadow",
        isVisible ? "right-[10%] bottom-[10%]" : "-right-[50%]"
      )}
      onClick={scrollToTop}>
      {
        <div>
          <IoMdArrowDropupCircle className="h-16 w-16 lg:h-14 lg:w-14 text-[#306c8a]/90 rounded-full bg-[#306c8a]/20" />
        </div>
      }
    </button>
  );
}

export default ScrollToTop;
