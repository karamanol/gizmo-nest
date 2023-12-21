import { useSearchParams } from "next/navigation";

export function useGetSortParams(sortOptions: string[]) {
  const searchParams = useSearchParams();
  const sortParam = searchParams.get("sort") || "new_first";
  const sortParamIsValid = sortOptions.includes(sortParam);

  const sorting = sortParamIsValid ? sortParam : "new_first";

  return sorting;
}
