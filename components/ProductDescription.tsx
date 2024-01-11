import { ProductType } from "@/services/server/getOneProductById";
import ProductAvgRating from "./ProductAvgRating";

type ProductDescriptionProps = {
  product: ProductType;
};

function ProductDescription({ product }: ProductDescriptionProps) {
  const specs = JSON.parse(product?.specs || "{}");

  return (
    <section className="center pt-4 ">
      <div className="bg-white rounded-md p-5 flex flex-col gap-4">
        {product?.description ? (
          <section className="flex flex-col">
            <h2 className="font-semibold text-lg">Description:</h2>
            <span className="text-sm sm:text-base">{product?.description}</span>
          </section>
        ) : null}
        <div className="grid grid-rows-[1.3fr,1fr] lg:grid-cols-[2fr,1fr] lg:grid-rows-1 ">
          <div className=" flex flex-col gap-4 ">
            {product?.productProperties ? (
              <section className="flex flex-col">
                <h2 className="font-semibold text-lg">
                  {product?.name} features:
                </h2>
                <div>
                  {Object.entries(product.productProperties).map((property) => {
                    return (
                      <div
                        key={property[0]}
                        className="flex justify-between text-sm sm:text-base ">
                        <span>{property[0]}</span>
                        <span className="dots -translate-y-[45%]"></span>
                        <span>{property[1]}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : (
              <div className="flex items-center justify-center flex-grow">
                <span className="text-xl font-semibold">
                  No features information available
                </span>
              </div>
            )}

            {Object.entries(specs).length > 0 ? (
              <section className="">
                <h2 className="font-semibold text-lg mb-1">
                  {product?.name} detailed specs:
                </h2>
                <div>
                  {Object.entries(specs).map((el) => (
                    <div
                      key={el[0]}
                      className="flex justify-between text-sm sm:text-base ">
                      <span>{el[0]}</span>
                      <span className="dots -translate-y-[45%]"></span>
                      <span>{el[1] as string}</span>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
          <ProductAvgRating
            className="bg-slate-50 p-2 my-6 mx-2 sm:mx-6 rounded-md border border-gray-100 shadow-sm"
            ratingsAverage={product?.ratingsAverage}
            ratingsQuant={product?.ratingsQuantity}
          />
        </div>
      </div>
    </section>
  );
}

export default ProductDescription;
