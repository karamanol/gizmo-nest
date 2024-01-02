import { useGetProductByName } from "@/hooks/useGetProductByName";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SpinnerCircle from "./SpinnerCircle";
import { cn } from "@/lib/cn";
import SearchResults from "./SearchResults";

export const dynamic = "force-dynamic";

type SearchBarProps = {
  className?: string;
  isOpenMobileView?: boolean;
  setIsOpenMobileView?: Dispatch<SetStateAction<boolean>>;
};
const SearchBar = ({
  className,
  setIsOpenMobileView,
  isOpenMobileView,
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const { isLoading, productsFound } = useGetProductByName(searchTerm);

  return (
    <search className={cn("relative ml-5 w-96", className)}>
      <label htmlFor="search">
        <FaMagnifyingGlass className=" h-6 w-6 absolute left-3 top-[50%] -translate-y-[48%]" />
      </label>
      <input
        type="text"
        id="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        className={cn(
          "pl-12  border-1  border-gray-300 bg-slate-100 h-10 rounded-md text-sm w-32 focus:w-96 focus:outline-none transition-all focus:bg-white lg:w-32 sm:w-96",
          isLoading || searchTerm ? "w-96 pr-11 sm:pr-3" : "pr-3",
          isOpenMobileView ? "w-full lg:w-96" : ""
        )}
      />
      {isLoading && (
        <SpinnerCircle className="h-6 w-6 absolute right-3 top-[50%] -translate-y-[48%]" />
      )}
      {!isLoading && searchTerm.length > 0 && (
        <button
          className="h-6 w-6 absolute right-3 top-[50%] -translate-y-[52%] scale-[150%] hover:scale-[175%]"
          type="button"
          onClick={() => {
            setSearchTerm("");
          }}>
          &times;
        </button>
      )}

      <SearchResults
        setIsOpenMobileView={setIsOpenMobileView}
        searchString={searchTerm}
        products={productsFound}
        setSearchTerm={setSearchTerm}
        className={cn(
          "bg-slate-100 absolute w-full -translate-y-1 rounded-b-md py-1",
          isOpenMobileView ? "" : ""
        )}
      />
    </search>
  );
};

export default SearchBar;
