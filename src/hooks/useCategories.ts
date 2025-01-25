import { useQuery } from "@tanstack/react-query";
import { Category } from "../lib/types";
import { fetchCategories } from "../services/apiCategories";

export function useCategories(): {
  categories: Category[];
  isLoading: boolean;
} {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
    throwOnError: true
  });

  return {
    categories: data || [],
    isLoading
  } as const;
}
