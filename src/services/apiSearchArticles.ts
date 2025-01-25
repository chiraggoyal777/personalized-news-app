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

export async function fetchNewsArticlesBySourcesQuery(
  q: string,
  sources: string,
  from: string | null,
  to: string | null,
  page: number
): Promise<ArticleResponse> {
  try {
    // Base URL and query parameters
    const baseUrl = `${NEWS_ORG_API_BASE_URL}/everything`;
    const params: Record<string, string> = {
      q: `"${q}"`, // Wrap query in quotes for exact match
      apiKey: NEWS_ORG_API_KEY,
      pageSize: API_DEFAULT_PAGE_SIZE.toString(),
      page: page.toString(),
      // searchIn: "title,description",
      sortBy: "relevancy"
    };

    // Add 'sources' only if it has a value
    if (sources) params.sources = sources;

    if (from) params.from = from;

    if (to) params.to = to;

    // Construct the query string
    const queryString = new URLSearchParams(params).toString();

    const response = await axios.get(`${baseUrl}?${queryString}`);
    return response.data;
  } catch (error) {
    return handleError(error, "articles-news-sources-query");
  }
}

export async function fetchArticlesBySectionsQuery(
  q: string,
  from: string | null,
  to: string | null,
  page: number // The page number for pagination
): Promise<ArticleResponse> {
  let accumulatedArticles: Article[] = [];
  let totalResults = 0;
  let status = "ok";

  // Helper function to handle the API request
  const fetchDataForQuery = async (params: Record<string, string>) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await axios.get(
        `${GUARDIAN_API_BASE_URL}/search?${queryString}`
      );
      const data = response.data.response;

      // If data has valid results, add them
      if (data && data.results.length > 0) {
        const articles = data.results.map(convertGuardianArticleToArticle);
        accumulatedArticles = [...accumulatedArticles, ...articles];
        totalResults += data.total || 0;
      }
    } catch (error) {
      handleError(error, "articles-guardian-query");
      status = "error"; // Handle failure
    }
  };

  // Set up the base parameters for the request
  const baseParams: Record<string, string> = {
    q: `"${q}"`,
    "api-key": THE_GUARDIAN_API_KEY,
    "show-fields": "headline,trailText,shortUrl,thumbnail",
    page: page.toString(),
    "page-size": API_DEFAULT_PAGE_SIZE.toString()
  };

  if (from) baseParams["from-date"] = from;
  if (to) baseParams["to-date"] = to;
  // if (from && to) baseParams.q = q;

  await fetchDataForQuery(baseParams);

  return {
    status,
    totalResults,
    articles: accumulatedArticles
  };
}
