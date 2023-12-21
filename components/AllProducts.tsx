"use client";

import { getProducts } from "@/services/frontend/getPoducts";
import { useQuery } from "@tanstack/react-query";
import { useGetLimitParams } from "@/hooks/useGetLimitParams";
import { useGetSortParams } from "@/hooks/useGetSortParams";
import { useGetPageParams } from "@/hooks/useGetPageParams";
import ProductCard from "./ProductCard";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import ProductCardSkeleton from "./ProductCardSkeleton";
import Pagination from "./Pagination";
import SpinnerCircle from "./SpinnerCircle";
import toast from "react-hot-toast";

// type AllProductsProps = {
//   products: ProductType[];
// };
const sortByStrings = [
  "new_first",
  "old_first",
  "cheap_first",
  "expensive_first",
  "discounted_first",
];

function AllProducts() {
  const router = useRouter();
  const sort = useGetSortParams(sortByStrings);
  const page = useGetPageParams();
  const limit = useGetLimitParams("20");

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", sort, page, limit],
    queryFn: () =>
      getProducts({ page: page.toString(), limit: limit.toString(), sort }),
  });

  if (error?.message) toast.error(error.message);

  const handleChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(
      `?${new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort: e.target.value,
      })}`
    );
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(
      `?${new URLSearchParams({
        page: page.toString(),
        limit: e.target.value,
        sort: sort,
      })}`
    );
  };

  return (
    <section className="center">
      <div className="flex items-center justify-between pt-6">
        <h2 className="text-3xl font-semibold text-gray-800 flex gap-4 items-center ">
          <span>Our Products:</span>
          {isLoading ? <SpinnerCircle loadingMessage="" /> : null}
        </h2>

        <div className="flex gap-2 items-center">
          <span className="text-gray-700">Sort by:</span>
          <select onChange={handleChangeSort} className="rounded-md px-2 py-1">
            <option value={"new_first"}>Latest</option>
            <option value={"old_first"}>Oldest</option>
            <option value={"cheap_first"}>Cheap first</option>
            <option value={"expensive_first"}>Expensive first</option>
            <option value={"discounted_first"}>With discount</option>
          </select>

          <select onChange={handleChangeLimit} className="rounded-md px-2 py-1">
            <option value={"20"}>20</option>
            <option value={"40"}>40</option>
            <option value={"60"}>60</option>
          </select>
        </div>
      </div>
      {error?.message ? (
        <div className="flex justify-center items-center h-[80vh]">
          <span className="text-2xl">{"🥹 Error getting products..."}</span>
        </div>
      ) : null}
      <div className="grid grid-cols-4 gap-4 pt-4">
        {isLoading
          ? new Array(limit)
              .fill(0)
              .map((_el, i) => <ProductCardSkeleton key={i} />)
          : products
              ?.slice(0, limit)
              ?.map((product) => (
                <ProductCard key={product?._id} product={product} />
              ))}
      </div>

      {(Array.isArray(products) && products.length <= limit && page === 1) ||
      error ? null : (
        <Pagination
          page={page}
          resultsPerPage={limit}
          sortBy={sort}
          isDisabledNextBtn={(products?.length ?? 0) <= limit}
        />
      )}
    </section>
  );
}

export default AllProducts;
