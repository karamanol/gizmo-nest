import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

function Products() {
  return <div>products</div>;
}

export default Products;

export async function getServersSideProps({}) {
  await mongooseConnect();

  return { props: { products: await Product.find({}, { sort: "_id" }) } };
}
