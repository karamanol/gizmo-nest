import { getErrorMessage } from "@/utils/getErrorMessage";

export async function getPromotedProducs(amount: number) {
  try {
    const url = `/api/products/promoted?amount=${amount}`;
    const response = await fetch(url, { method: "GET" });
    const products = await response.json();
    // console.log(products);
    return JSON.parse(JSON.stringify(products.data));
  } catch (err) {
    console.log(getErrorMessage(err));
  }
}
