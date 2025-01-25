import { Category } from "../lib/types";
import { handleError } from "../lib/utils";
import { ALL_CATEGORIES } from "../lib/data";

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response: Category[] = await new Promise((resolve) =>
      setTimeout(() => {
        resolve(ALL_CATEGORIES);
        // Fake timeout to imitate promise
      }, 500)
    );
    return response;
  } catch (error) {
    return handleError(error, "list-categories");
  }
}
