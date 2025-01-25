import axios from "axios";
import { SourceResponse } from "../lib/types";
import { NEWS_ORG_API_BASE_URL, NEWS_ORG_API_KEY } from "../lib/constants";
import { handleError } from "../lib/utils";

export async function fetchSources(): Promise<SourceResponse> {
  try {
    const response = await axios.get(
      `${NEWS_ORG_API_BASE_URL}/top-headlines/sources?apiKey=${NEWS_ORG_API_KEY}`
    );
    return response.data;
  } catch (error) {
    return handleError(error, "list-news-sources");
  }
}
