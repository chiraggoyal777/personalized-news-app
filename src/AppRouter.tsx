import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchResultsPage from "./pages/SearchResultsPage";
import HomePage from "./pages/HomePage";
import SearchFiltersProvider from "./contexts/SearchFiltersProvider";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/search-results"
          element={
            <SearchFiltersProvider>
              <SearchResultsPage />
            </SearchFiltersProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
