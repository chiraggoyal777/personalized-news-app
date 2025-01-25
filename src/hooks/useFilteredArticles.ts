import { useInfiniteQuery } from "@tanstack/react-query";
import { API_DEFAULT_PAGE_SIZE } from "../lib/constants";
import { shuffleAndMixArrays } from "../lib/utils";
import { Article } from "../lib/types";
import { useSearchFiltersContext } from "../contexts/SearchFiltersProvider";
import {
  fetchArticlesBySectionsQuery,
  fetchNewsArticlesBySourcesQuery
} from "../services/apiSearchArticles";

export function useFilteredArticles() {
  const { searchQuery, filters } = useSearchFiltersContext();
  const sources = filters.sources;
  const fromDate = filters.from;
  const toDate = filters.to;

  type PageParam = {
    sources: number | null;
    sections: number | null;
    sourcesHasNextPage?: boolean;
    sectionsHasNextPage?: boolean; // Track per-section
  };
  const fetchArticlesByPage = async ({
    pageParam
  }: {
    pageParam: PageParam;
  }) => {
    const sourcesPage = pageParam.sources || 1;
    const sectionsPage = pageParam.sections || 1;

    // If a previous API returned no results, do not request further pages for that API
    const sourcesHasNextPage = pageParam.sourcesHasNextPage ?? true;
    const sectionsHasNextPage = pageParam.sectionsHasNextPage ?? true;

    const blankAndValidResponse = {
      status: "ok",
      totalResults: 0,
      articles: []
    };
    const [sourcesResponse, sectionsResponse] = await Promise.all([
      sourcesHasNextPage && searchQuery
        ? fetchNewsArticlesBySourcesQuery(
            searchQuery,
            sources.toString(),
            fromDate,
            toDate,
            sourcesPage
          )
        : blankAndValidResponse,
      sectionsHasNextPage && searchQuery
        ? fetchArticlesBySectionsQuery(
            searchQuery,
            fromDate,
            toDate,
            sectionsPage
          )
        : blankAndValidResponse
    ]);

    const nextSourcesHasNextPage =
      sourcesResponse.articles.length > 0 &&
      sourcesPage * API_DEFAULT_PAGE_SIZE < sourcesResponse.totalResults;

    const nextSectionsHasNextPage =
      sectionsResponse.articles.length > 0 &&
      sectionsPage * API_DEFAULT_PAGE_SIZE < sectionsResponse.totalResults;
    return {
      articles: shuffleAndMixArrays(
        sourcesResponse.articles,
        sectionsResponse.articles
      ),
      nextPage: {
        sources: nextSourcesHasNextPage ? sourcesPage + 1 : null,
        sourcesHasNextPage: nextSourcesHasNextPage,
        sections: nextSectionsHasNextPage ? sectionsPage + 1 : null,
        sectionsHasNextPage: nextSectionsHasNextPage
      }
    };
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery<{
      articles: Article[];
      nextPage: PageParam;
    }>({
      queryKey: ["articles-query", filters, searchQuery],
      queryFn: ({ pageParam }) =>
        fetchArticlesByPage({
          pageParam: pageParam as PageParam
        }),
      initialPageParam: { sources: 1, sections: 1 },
      getNextPageParam: (lastPage) => {
        const { nextPage } = lastPage;

        // If all nextPage entries are null, stop pagination
        if (!nextPage.sources && !nextPage.sections) {
          return undefined;
        }

        return nextPage;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: true,
      retry: false,
      enabled: Boolean(searchQuery), // Ensure the query is only enabled if searchQuery is present
      throwOnError: true
    });

  const articles = data?.pages.flatMap((page) => page.articles) || [];

  return {
    articles,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage
  };
}
