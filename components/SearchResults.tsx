import { cn } from "@/lib/cn";
import { ProductType } from "@/services/server/getOneProductById";
import Link from "next/link";

type SearchResultsProps = {
  products: ProductType[] | undefined;
  className?: string;
  searchString: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsOpenMobileView?: React.Dispatch<React.SetStateAction<boolean>>;
};

function SearchResults({
  products,
  className,
  searchString,
  setSearchTerm,
  setIsOpenMobileView,
}: SearchResultsProps) {
  if (typeof products === "undefined" || searchString.length <= 2) return null;
  if (Array.isArray(products) && products.length === 0)
    return (
      <div className="bg-slate-100 absolute w-full rounded-b-md py-2 -translate-y-1 text-center">
        No products found
      </div>
    );

  return (
    <ul className={cn("z-10 flex flex-col gap-1", className)}>
      {products?.map((product) => (
        <Link
          className=" hover:bg-slate-200 p-1 transition-colors px-3 "
          href={`/product/${product?._id.toString()}`}
          key={product?._id}
          onClick={() => {
            setIsOpenMobileView?.(false);
            setSearchTerm("");
          }}>
          {product?.name}
        </Link>
      ))}
    </ul>
  );
}

export default SearchResults;
