import { useSearchParams } from "next/navigation";

export function useGetLimitParams(defaultLimit: string) {
  const searchParams = useSearchParams();
  const pageLimit = searchParams.get("limit") || defaultLimit;
  const pageParamIsValid = !isNaN(parseInt(pageLimit)); // making sure it is an integer

  const limit = Math.max(
    parseInt(pageParamIsValid ? pageLimit : defaultLimit),
    1
  ); // making sure it is a positive number
  return limit <= 100 ? limit : 100;
}
