export interface Category {
  id: string;
  name: string;
}
export interface Article {
  source: {
    id: null | string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
export interface GuardianArticle {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
  fields: {
    headline: string;
    trailText: string;
    shortUrl: string;
    thumbnail: string;
  };
}
export interface ArticleResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}
export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}
export interface SourceResponse {
  status: string;
  sources: Source[];
}

export interface SourcesState {
  sources: Source[] | null;
  loading: boolean;
  error: string | null;
}
