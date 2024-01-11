import AddReviewAsDropdown from "@/components/AddReviewAsDropdown";
import AddToFavouriteButton from "@/components/AddToFavouriteButton";
import ImagesVerticalCarousel from "@/components/ImagesVerticalCarousel";
import ProductDescription from "@/components/ProductDescription";
import ProductReviews from "@/components/ProductReviews";
import WideAddProductButton from "@/components/WideAddProductButton";
import { getOneProductById } from "@/services/server/getOneProductById";
import { notFound } from "next/navigation";
import { FaCheck } from "react-icons/fa6";
import { RiEmotionSadLine } from "react-icons/ri";

async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getOneProductById(params.id);

  if (!product) {
    // return <div className="center">Page does not exist</div>;
    notFound();
  }
  const productId = product?._id.toString() || "";
  const productFinalPrice = (product?.price ?? 0) - (product?.discount ?? 0);

  return (
    <>
      <div className="center  pt-6 ">
        <article className="grid grid-rows-[1.3fr,1fr] lg:grid-rows-1 lg:grid-cols-[1.3fr,1fr]  bg-white p-4 rounded-md">
          <div className="flex">
            <ImagesVerticalCarousel imagesArr={product?.images} />
          </div>

          <section className=" flex flex-col gap-2 mx-3 my-6">
            <section className="flex justify-between">
              <span className="font-bold text-xl lg:text-3xl">
                {product?.name}
              </span>
              <div className="scale-90">
                <AddToFavouriteButton
                  productId={product?._id.toString() || ""}
                />
              </div>
            </section>
            <section className="text-gray-800 lg:text-base text-sm">
              {product?.description}
            </section>
            <section className="flex p-2 rounded-md mt-auto justify-around lg:justify-between drop-shadow-md  ">
              <div className="flex gap-2 items-end ">
                <span className="text-xl md:text-2xl text-gray-800">
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
                  <span className="inline-flex items-center gap-1 text-gray-800 whitespace-nowrap">
                    {"Out of stock"}
                    <RiEmotionSadLine />
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-gray-800 whitespace-nowrap">
                    {"In stock"}
                    <FaCheck className="text-green-800" />
                  </span>
                )}
              </div>
            </section>
            <WideAddProductButton
              disabled={product?.soldout}
              productId={productId}
              className="mt-auto hover:bg-gray-950 hover:text-white text-xl h-12 lg:h-fit drop-shadow-md"
            />
          </section>
        </article>
      </div>

      <ProductDescription product={product} />

      <div className="center pt-4">
        <AddReviewAsDropdown
          productId={product?._id.toString() || ""}
          productName={product?.name || ""}
        />
      </div>

      <ProductReviews reviewsArray={product.reviews} />
    </>
  );
}

export default ProductPage;
