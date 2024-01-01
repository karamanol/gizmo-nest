import { useGetProductByName } from "@/hooks/useGetProductByName";
import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SpinnerCircle from "./SpinnerCircle";
import { cn } from "@/lib/cn";
import SearchResults from "./SearchResults";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const { isLoading, productsFound } = useGetProductByName(searchTerm);

  return (
    <search className="relative ml-5 w-96">
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
          "pl-12  border-1  border-gray-300 bg-slate-100 h-10 rounded-md text-sm w-32 focus:w-96 focus:outline-none transition-all focus:bg-white",
          isLoading || searchTerm ? "w-96 pr-11" : "pr-3"
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
        searchString={searchTerm}
        products={productsFound}
        setSearchTerm={setSearchTerm}
        className="bg-slate-100 absolute w-full -translate-y-1 rounded-b-md py-1"
      />
    </search>
  );
};

export default SearchBar;
