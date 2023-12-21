import { ProductType } from "@/services/server/getOneProductById";
import Image from "next/image";
import Link from "next/link";
import ProductCardAddButton from "./ProductCardAddButton";
import { cn } from "@/lib/cn";

type ProductCardProps = {
  product: ProductType;
};

function ProductCard({ product }: ProductCardProps) {
  const productFinalPrice = (product?.price ?? 0) - (product?.discount ?? 0);
  const linkToProduct = `/product/${product?._id}`;

  return (
    <article
      className={cn(
        product?.soldout ? "opacity-60" : "",
        "border rounded-md bg-white p-4 gap-3 drop-shadow-sm flex flex-col justify-center items-center hover:scale-[102%] transition-transform"
      )}>
      <section className="relative h-40 w-full ">
        <Link href={linkToProduct}>
          <Image
            src={product?.images?.[0] || "/product-default-list-350.jpg"}
            fill
            className="object-contain"
            alt={`${product?.name} image`}
          />
        </Link>
      </section>

      <section>
        <Link href={linkToProduct}>
          <span className="font-semibold text-gray-800 hover:text-black transition-all">
            {product?.name}
          </span>
        </Link>
      </section>

      <section className="flex items-center justify-between w-full mt-auto">
        <div className="flex flex-col gap-1">
          {!!product?.discount && (
            <div className=" flex gap-2">
              <span className="inline-block line-through text-gray-500">
                {product?.price}
              </span>
              <span className="inline-block border border-yellow-200 bg-yellow-300 rounded px-2">{`-${product.discount}`}</span>
            </div>
          )}
          <div className=" font-bold text-2xl text-gray-900">
            {`${productFinalPrice.toLocaleString("en-US", {
              currency: "USD",
              style: "currency",
            })}`}
          </div>
        </div>
        <ProductCardAddButton
          disabled={product?.soldout}
          productId={product?._id.toString() || ""}
        />
      </section>
    </article>
  );
}

export default ProductCard;
