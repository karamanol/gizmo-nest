import { getErrorMessage } from "@/utils/getErrorMessage";
import { ProductType } from "../services/server/getOneProductById";
import { useEffect, useState } from "react";

const delay = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
export function useGetProductByName(searchString: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [productsFound, setProductsFound] = useState<ProductType[]>();

  useEffect(() => {
    (async () => {
      if (!searchString || searchString.length < 3)
        return setProductsFound(undefined);
      await delay(700);
      setIsLoading(true);
      const controller = new AbortController();

      async function fetchProductBySearchString(query: string) {
        try {
          const url = `/api/products/search?${new URLSearchParams({
            searchString: query,
          })}`;
          const response = await fetch(url, { method: "GET" });
          const data = await response.json();

          if ("error" in data) throw new Error(data.error);
          if ("data" in data) {
            setProductsFound(data.data);
          }
        } catch (err) {
          const errorMessage = getErrorMessage(err);
          throw new Error(errorMessage);
        } finally {
          setIsLoading(false);
        }
      }

      fetchProductBySearchString(searchString);

      // cleanup
      return () => {
        controller.abort();
      };
    })();
  }, [searchString]);

  return { isLoading, productsFound };
}
