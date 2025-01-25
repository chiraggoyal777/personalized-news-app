import { Category } from "./types";

// Static categories because of no API endpoint
export const NEWS_ORG_RESERVED_CATEGORIES = [
  { id: "business", name: "Business" },
  { id: "entertainment", name: "Entertainment" },
  { id: "general", name: "General" },
  { id: "health", name: "Health" },
  { id: "science", name: "Science" },
  { id: "sports", name: "Sports" },
  { id: "technology", name: "Technology" }
];
export const ALL_CATEGORIES: Category[] = [
  ...NEWS_ORG_RESERVED_CATEGORIES,
  { id: "artanddesign", name: "Art and Design" },
  { id: "culture", name: "Culture" },
  { id: "education", name: "Education" },
  { id: "environment", name: "Environment" },
  { id: "fashion", name: "Fashion" },
  { id: "film", name: "Film" },
  { id: "food", name: "Food" },
  { id: "lifeandstyle", name: "Life and Style" },
  { id: "media", name: "Media" },
  { id: "money", name: "Money" },
  { id: "music", name: "Music" },
  { id: "politics", name: "Politics" },
  { id: "society", name: "Society" },
  { id: "travel", name: "Travel" },
  { id: "tv-and-radio", name: "TV and Radio" },
  { id: "world", name: "World" }
];

export const DEFAULT_CATEGORY =
  ALL_CATEGORIES[
    Math.floor(
      Math.random() *
        (ALL_CATEGORIES.length - NEWS_ORG_RESERVED_CATEGORIES.length)
    ) + NEWS_ORG_RESERVED_CATEGORIES.length
  ];
