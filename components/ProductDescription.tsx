import { ProductType } from "@/services/server/getOneProductById";
import ProductAvgRating from "./ProductAvgRating";

type ProductDescriptionProps = {
  product: ProductType;
};

function ProductDescription({ product }: ProductDescriptionProps) {
  const specs = JSON.parse(product?.specs || "{}");
  // console.log(specs);

  return (
    <section className="center pt-4 ">
      <div className="bg-white rounded-md p-5 flex flex-col gap-4">
        {product?.description ? (
          <section className="flex flex-col">
            <h2 className="font-semibold text-lg">Description:</h2>
            <span className="">{product?.description}</span>
          </section>
        ) : null}
        <div className="grid grid-cols-[2fr,1fr] ">
          <div className=" flex flex-col gap-4 ">
            {product?.productProperties ? (
              <section className="flex flex-col">
                <h2 className="font-semibold text-lg">
                  {product?.name} features:
                </h2>
                <div>
                  {Object.entries(product.productProperties).map((property) => {
                    return (
                      <div key={property[0]} className="flex justify-between ">
                        <span>{property[0]}</span>
                        <span className="dots -translate-y-[45%]"></span>
                        <span>{property[1]}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : null}

            {Object.entries(specs).length > 0 ? (
              <section className="">
                <h2 className="font-semibold text-lg mb-1">
                  {product?.name} detailed specs:
                </h2>
                <div>
                  {Object.entries(specs).map((el) => (
                    <div key={el[0]} className="flex justify-between ">
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
            className="bg-slate-50 p-2 m-6 rounded-md border border-gray-100 shadow-sm"
            ratingsAverage={product?.ratingsAverage}
            ratingsQuant={product?.ratingsQuantity}
          />
        </div>
      </div>
    </section>
  );
}

export default ProductDescription;
