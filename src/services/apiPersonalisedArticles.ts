import axios from "axios";
import {
  API_DEFAULT_PAGE_SIZE,
  GUARDIAN_API_BASE_URL,
  NEWS_ORG_API_BASE_URL,
  NEWS_ORG_API_KEY,
  THE_GUARDIAN_API_KEY
} from "../lib/constants";
import { convertGuardianArticleToArticle, handleError } from "../lib/utils";
import { Article, ArticleResponse } from "../lib/types";

export async function fetchTopHeadlinesBySources(
  sources: string,
  page: number
): Promise<ArticleResponse> {
  try {
    const response = await axios.get(
      `${NEWS_ORG_API_BASE_URL}/top-headlines?sources=${sources}&apiKey=${NEWS_ORG_API_KEY}&pageSize=${API_DEFAULT_PAGE_SIZE}&page=${page}`
    );
    return response.data;
  } catch (error) {
    return handleError(error, "articles-news-sources");
  }
}

export async function fetchTopHeadlinesByCategories(
  categories: string,
  page: number
): Promise<ArticleResponse> {
  try {
    const response = await axios.get(
      `${NEWS_ORG_API_BASE_URL}/top-headlines?category=${categories}&apiKey=${NEWS_ORG_API_KEY}&pageSize=${API_DEFAULT_PAGE_SIZE}&page=${page}`
    );
    return response.data;
  } catch (error) {
    return handleError(error, "articles-news-categories");
  }
}

export async function fetchArticlesBySections(
  sections: string[], // Array of sections to search
  page: number // The page number for pagination
): Promise<ArticleResponse> {
  let accumulatedArticles: Article[] = [];
  let totalResults = 0;
  let status = "ok";

  for (const section of sections) {
    try {
      const response = await axios.get(
        `${GUARDIAN_API_BASE_URL}/search?section=${section}&api-key=${THE_GUARDIAN_API_KEY}&show-fields=headline,trailText,shortUrl,thumbnail&page=${page}&page-size=${API_DEFAULT_PAGE_SIZE}`
      );

      const data = response.data.response;

      const articles = data.results.map(convertGuardianArticleToArticle);
      accumulatedArticles = [...accumulatedArticles, ...articles];
      totalResults += data.total;
    } catch (error) {
      handleError(error, "articles-guardian-sections");
      status = "error";
      break;
    }
  }

  // Return the accumulated results in the ArticleResponse format
  return {
    status,
    totalResults,
    articles: accumulatedArticles
  };
}
