import { getErrorMessage } from "@/utils/getErrorMessage";

const sixHoursInSeconds = 3600 * 6;
export async function getPromotedProducs(amount: number) {
  try {
    const url = `/api/products/promoted?amount=${amount}`;
    const response = await fetch(url, {
      method: "GET",
      next: { revalidate: sixHoursInSeconds },
    });
    const products = await response.json();
    return JSON.parse(JSON.stringify(products.data));
  } catch (err) {
    console.log(getErrorMessage(err));
  }
}
