import { useInfiniteQuery } from "@tanstack/react-query";

import { usePreferencesContext } from "../contexts/PreferencesProvider";
import { shuffleAndMixArrays } from "../lib/utils";
import { Article } from "../lib/types";
import { DEFAULT_CATEGORY, NEWS_ORG_RESERVED_CATEGORIES } from "../lib/data";
import {
  fetchArticlesBySections,
  fetchTopHeadlinesByCategories,
  fetchTopHeadlinesBySources
} from "../services/apiPersonalisedArticles";
import { API_DEFAULT_PAGE_SIZE } from "../lib/constants";

export function useArticles() {
  const { preferences, isLoading: isLoadingPreferences } =
    usePreferencesContext();

  type PageParam = {
    sources: number | null;
    categories: number | null;
    sections: number | null;
    sourcesHasNextPage?: boolean;
    categoriesHasNextPage?: boolean;
    sectionsHasNextPage?: boolean;
  };
  const fetchArticlesByPage = async ({
    pageParam
  }: {
    pageParam: PageParam;
  }) => {
    const sourcesPage = pageParam.sources || 1;
    const categoriesPage = pageParam.categories || 1;
    const sectionsPage = pageParam.sections || 1;

    // If a previous API returned no results, do not request further pages for that API
    const sourcesHasNextPage = pageParam.sourcesHasNextPage ?? true;
    const categoriesHasNextPage = pageParam.categoriesHasNextPage ?? true;
    const sectionsHasNextPage = pageParam.sectionsHasNextPage ?? true;

    const NEWS_ORG_PREFERRED_CATEGORIES = preferences.categories.filter(
      (item) => NEWS_ORG_RESERVED_CATEGORIES.map((cat) => cat.id).includes(item)
    );
    const blankAndValidResponse = {
      status: "ok",
      totalResults: 0,
      articles: []
    };
    const [sourcesResponse, categoriesResponse, sectionsResponse] =
      await Promise.all([
        sourcesHasNextPage && preferences.sources.length > 0
          ? fetchTopHeadlinesBySources(
              preferences.sources.toString(),
              sourcesPage
            )
          : blankAndValidResponse,
        categoriesHasNextPage && NEWS_ORG_PREFERRED_CATEGORIES.length > 0
          ? fetchTopHeadlinesByCategories(
              NEWS_ORG_PREFERRED_CATEGORIES.toString(),
              categoriesPage
            )
          : blankAndValidResponse,
        sectionsHasNextPage &&
        !isLoadingPreferences &&
        preferences.sources.length === 0 &&
        preferences.categories.length === 0
          ? fetchArticlesBySections([DEFAULT_CATEGORY.id], sectionsPage)
          : sectionsHasNextPage && preferences.categories.length > 0
            ? fetchArticlesBySections(preferences.categories, sectionsPage)
            : blankAndValidResponse
      ]);

    const nextSourcesHasNextPage =
      sourcesResponse.articles.length > 0 &&
      sourcesPage * API_DEFAULT_PAGE_SIZE < sourcesResponse.totalResults;

    const nextCategoriesHasNextPage =
      categoriesResponse.articles.length > 0 &&
      categoriesPage * API_DEFAULT_PAGE_SIZE < categoriesResponse.totalResults;

    const nextSectionsHasNextPage =
      sectionsResponse.articles.length > 0 &&
      sectionsPage * API_DEFAULT_PAGE_SIZE < sectionsResponse.totalResults;

    return {
      articles: shuffleAndMixArrays(
        sourcesResponse.articles,
        categoriesResponse.articles,
        sectionsResponse.articles
      ),
      nextPage: {
        sources: nextSourcesHasNextPage ? sourcesPage + 1 : null,
        categories: nextCategoriesHasNextPage ? categoriesPage + 1 : null,
        sections: nextSectionsHasNextPage ? sectionsPage + 1 : null,
        sourcesHasNextPage: nextSourcesHasNextPage,
        categoriesHasNextPage: nextCategoriesHasNextPage,
        sectionsHasNextPage: nextSectionsHasNextPage
      }
    };
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery<{
      articles: Article[];
      nextPage: PageParam;
    }>({
      queryKey: [
        "articles",
        preferences.sources,
        preferences.categories,
        isLoadingPreferences
      ],
      queryFn: ({ pageParam }) =>
        fetchArticlesByPage({
          pageParam: pageParam as PageParam
        }),
      initialPageParam: { sources: 1, categories: 1, sections: 1 },
      getNextPageParam: (lastPage) => {
        const { nextPage } = lastPage;

        // If all nextPage entries are null, stop pagination
        if (!nextPage.sources && !nextPage.categories && !nextPage.sections) {
          return undefined;
        }

        return nextPage;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: true,
      retry: false,
      enabled: true,
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
