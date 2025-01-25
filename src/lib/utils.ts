import toast from "react-hot-toast";
import { Article, GuardianArticle } from "./types";

export const shuffleAndMixArrays = <T>(...arrays: T[][]): T[] => {
  const combined = arrays.flat();
  for (let i = combined.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[randomIndex]] = [combined[randomIndex], combined[i]];
  }

  return combined;
};

type ErrorResponse = {
  response: {
    data: {
      code: string;
      message: string;
      status: "error" | "ok";
    };
  };
};

export const handleError = (error: unknown, origin: string) => {
  const isErrorResponse = (err: unknown): err is ErrorResponse =>
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as ErrorResponse).response.data?.message === "string";

  if (error instanceof Error) {
    toast.error(error.message);
    if (isErrorResponse(error)) {
      throw new Error(origin + ": " + error.response.data.message);
    } else {
      throw new Error(error.message + " from " + origin);
    }
  } else {
    toast.error("Unknown error occurred.");
    throw new Error("Unknown error occurred.");
  }
};

// Helper function to convert Guardian article to Article interface
export function convertGuardianArticleToArticle(
  guardianArticle: GuardianArticle
): Article {
  return {
    source: {
      id: guardianArticle.sectionId || null,
      name: guardianArticle.sectionName || "Unknown"
    },
    author: "Unknown",
    title: guardianArticle.webTitle || "No Title",
    description: guardianArticle.fields?.trailText || "",
    url: guardianArticle.webUrl || "",
    urlToImage: guardianArticle.fields?.thumbnail || "",
    publishedAt: guardianArticle.webPublicationDate || "",
    content: ""
  };
}
