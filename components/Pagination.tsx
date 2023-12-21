"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiMiniArrowLongLeft, HiMiniArrowLongRight } from "react-icons/hi2";

type PaginationProps = {
  page: number;
  isDisabledNextBtn: boolean;
  sortBy?: string;
  resultsPerPage?: number;
};

function Pagination({
  page,
  isDisabledNextBtn,
  sortBy,
  resultsPerPage,
}: PaginationProps) {
  const router = useRouter();

  const limit = resultsPerPage ? `&limit=${resultsPerPage}` : "";
  const sort = sortBy ? `&sort=${sortBy}` : "";
  const prevPage = `?page=${Math.max(page - 1, 1)}` + limit + sort;
  const nextPage = `?page=${page + 1}` + limit + sort;

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`?page=${event.currentTarget.value}` + limit + sort);
    }
  };

  return (
    <div className="flex gap-3 mt-5 justify-end mr-1 h-9">
      <Link
        href={prevPage}
        className={cn(
          page <= 1 ? "!bg-gray-400 pointer-events-none" : "",
          "!px-6  rounded-md py-1 bg-stone-800 text-neutral-300 hover:bg-stone-950 hover:text-white hover:shadow-md transition-all"
        )}>
        <HiMiniArrowLongLeft className="h-6 w-6 translate-y-[5%]" />
      </Link>

      <input
        className="w-16 !mb-0 rounded-md p-2"
        placeholder={page.toString()}
        type="number"
        onKeyDown={handleKeyPress}
      />

      <Link
        href={nextPage}
        className={cn(
          isDisabledNextBtn ? "!bg-gray-400 pointer-events-none" : "",
          "!px-6  rounded-md py-1 bg-stone-800 text-neutral-300 hover:bg-stone-950 hover:text-white hover:shadow-md transition-all"
        )}>
        <HiMiniArrowLongRight className="h-6 w-6 translate-y-[5%]" />
      </Link>
    </div>
  );
}

export default Pagination;
