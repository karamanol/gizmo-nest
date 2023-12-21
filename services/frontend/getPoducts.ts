import { getErrorMessage } from "@/utils/getErrorMessage";
import { ProductType } from "../server/getOneProductById";

export async function getProducts({
  sort,
  page,
  limit,
}: {
  sort: string;
  page: string;
  limit: string;
}) {
  try {
    const url = `/api/products?${new URLSearchParams({
      sort: sort,
      page: page,
      limit: limit,
    })}`;
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    // console.log(data);
    return data.data as ProductType[];
  } catch (err) {
    const errorMessage = getErrorMessage(err);
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
}
