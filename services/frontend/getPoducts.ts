import { getErrorMessage } from "@/utils/getErrorMessage";
import { ProductType } from "../server/getOneProductById";
import { Range } from "react-input-range";

export async function getProducts({
  sort,
  page,
  limit,
  categoryId,
  confirmedPriceRangeValue,
}: {
  sort: string;
  page: string;
  limit: string;
  categoryId?: string;
  confirmedPriceRangeValue?: {
    min: number;
    max: number;
  };
}) {
  try {
    const url = `/api/products?${new URLSearchParams({
      sort: sort,
      page: page,
      limit: limit,
      ...(categoryId ? { categoryId: categoryId } : null),
      priceRange: `${confirmedPriceRangeValue?.min}-${confirmedPriceRangeValue?.max}`,
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
