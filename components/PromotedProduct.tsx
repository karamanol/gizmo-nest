import { getPromotedProduct } from "@/services/getPromotedProduct";
import Image from "next/image";
import Link from "next/link";
import PromotedAddButton from "./PromotedAddButton";

async function PromotedProduct() {
  const product = await getPromotedProduct("6560a37c87d54d3d096eeb12");
  const promotedId = product?._id.toString() || "";
  // console.log(product);

  return (
    <div className="bg-main ">
      <div className="grid  grid-cols-[1.2fr,1fr] center pt-8 pb-6 gap-3">
        <div className="flex flex-col">
          <h1 className="text-gray-200 text-3xl mb-2">{product?.name}</h1>
          <p className="text-gray-400 mb-2">{product?.description}</p>
          <div className="flex justify-start gap-8 mt-2">
            <Link
              href={`/products/${product?._id}`}
              className="btn-primary opacity-60">
              <span>Read more</span>
            </Link>
            <PromotedAddButton promotedId={promotedId} />
          </div>
        </div>
        <div className="relative">
          <Image
            src={product?.images?.at(-1) || "/asus-rog.png"}
            fill
            alt={product?.name || "Promoted product"}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default PromotedProduct;
