import ImagesVerticalCarousel from "@/components/ImagesVerticalCarousel";
import WideAddProductButton from "@/components/WideAddProductButton";
import { cn } from "@/lib/cn";
import { getOneProductById } from "@/services/server/getOneProductById";
import { FaCheck } from "react-icons/fa6";
import { RiEmotionSadLine } from "react-icons/ri";

async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getOneProductById(params.id);
  const productId = product?._id.toString() || "";
  const productFinalPrice = (product?.price ?? 0) - (product?.discount ?? 0);

  console.log(params);
  return (
    <div className="center  pt-6 ">
      <article className="grid grid-cols-[1.3fr,1fr]  bg-white p-2 rounded-md">
        <ImagesVerticalCarousel imagesArr={product?.images} />
        <section className=" flex flex-col gap-2 mx-3 my-6">
          <section className="font-bold text-3xl">{product?.name}</section>
          <section className="text-gray-800">{product?.description}</section>
          <section className="flex p-2 rounded-md mt-auto justify-between drop-shadow-md  ">
            <div className="flex gap-2 items-end ">
              <span className="text-2xl text-gray-800">
                {`${productFinalPrice.toLocaleString("en-US", {
                  currency: "USD",
                  style: "currency",
                })}`}
              </span>
              {!!product?.discount && (
                <span className="inline-block line-through text-gray-500">
                  {product?.price}
                </span>
              )}
            </div>

            <div className="flex justify-center items-center bg-gray-100 rounded-md px-2 py-1">
              {product?.soldout ? (
                <span className="inline-flex items-center gap-1 text-gray-800">
                  {"Out of stock"}
                  <RiEmotionSadLine />
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-gray-800">
                  {"In stock"}
                  <FaCheck className="text-green-800" />
                </span>
              )}
            </div>
          </section>
          <WideAddProductButton
            disabled={product?.soldout}
            productId={productId}
            className="mt-auto hover:bg-stone-950 hover:text-white text-xl drop-shadow-md"
          />
        </section>
      </article>
    </div>
  );
}

export default ProductPage;
