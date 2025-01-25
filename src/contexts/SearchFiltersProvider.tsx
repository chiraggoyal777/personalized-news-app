import { createContext, useContext, useEffect, useState } from "react";
import { useQueryParams } from "../hooks/useQueryParams";

type Filters = {
  sources: string[];
  from: string | null;
  to: string | null;
};

type SearchFiltersContextType = {
  searchQuery: string | null;
  filters: Filters;
  hasAppliedFilters: boolean;
  handleUpdateFilters: (filters: Filters) => void;
  handleClearFilters: () => void;
};

export const SearchFiltersContext = createContext<
  SearchFiltersContextType | undefined
>(undefined);

export default function SearchFiltersProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { q: searchQuery } = useQueryParams();
  const initialFilters = {
    sources: [],
    from: null,
    to: null
  };
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const hasAppliedFilters =
    filters.from !== null || filters.to !== null || filters.sources.length > 0;

  function handleUpdateFilters(subFilters: Filters) {
    setFilters(subFilters);
  }
  function handleClearFilters() {
    setFilters(initialFilters);
  }

  useEffect(() => {
    handleClearFilters();
  }, [searchQuery]);

  return (
    <SearchFiltersContext.Provider
      value={{
        searchQuery,
        filters,
        hasAppliedFilters,
        handleUpdateFilters,
        handleClearFilters
      }}
    >
      {children}
    </SearchFiltersContext.Provider>
  );
}

export const useSearchFiltersContext = () => {
  const context = useContext(SearchFiltersContext);
  if (!context) {
    throw new Error(
      "useSearchFiltersContext must be used within a SearchFiltersProvider"
    );
  }
  return context;
};
