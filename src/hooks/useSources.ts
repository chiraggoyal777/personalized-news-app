import { useQuery } from "@tanstack/react-query";
import { Source } from "../lib/types";
import { fetchSources } from "../services/apiSources";

export function useSources(): {
  sources: Source[];
  isLoading: boolean;
} {
  const { data, isLoading } = useQuery({
    queryKey: ["sources"],
    queryFn: () => fetchSources(),
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
    throwOnError: true
  });

  return {
    sources: data?.sources || [],
    isLoading
  } as const;
}
