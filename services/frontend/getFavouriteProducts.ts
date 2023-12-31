import toast from "react-hot-toast";
import { ProductType } from "../server/getOneProductById";
import { getErrorMessage } from "@/utils/getErrorMessage";

export async function getFavouriteProducts(productsId: string[]) {
  try {
    if (!productsId?.[0]) return [];

    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(productsId),
    });
    const data: { data: ProductType[]; error?: string } = await res.json();

    if (!("error" in data) && data?.data?.length > 0) {
      return data.data;
    } else {
      throw new Error("Error fetching products");
    }
  } catch (err) {
    toast.error(getErrorMessage(err));
  }
}
