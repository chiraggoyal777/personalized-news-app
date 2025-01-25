import { Suspense } from "react";
import Layout from "../Layout";
import LoadingUI from "../components/LoadingUI";
import ErrorBoundary from "../ErrorBoundary";
import Results from "../features/Results";
import FiltersDialog from "../features/FiltersDialog";
import { Helmet } from "react-helmet-async";
import { APP_TITLE } from "../lib/constants";
import { useSearchFiltersContext } from "../contexts/SearchFiltersProvider";
import PageTitle from "../components/PageTitle";

const SearchResultsPage = () => {
  const { searchQuery, filters } = useSearchFiltersContext();

  const appliedSources = filters.sources;
  return (
    <>
      <Helmet>
        <title>
          Articles related to {searchQuery} - {APP_TITLE}
        </title>
      </Helmet>
      <Layout>
        <Suspense fallback={<LoadingUI />}>
          <ErrorBoundary>
            <PageTitle>
              <span>
                Showing results for <b>"{searchQuery}" </b>
              </span>
              {filters.from && (
                <span>
                  from <b className="whitespace-nowrap">{filters.from}</b>
                </span>
              )}{" "}
              {filters.to && (
                <span>
                  to <b className="whitespace-nowrap">{filters.to}</b>
                </span>
              )}{" "}
              {appliedSources.length > 0 && (
                <span>
                  from{" "}
                  {appliedSources.length > 3 ? (
                    <span className="whitespace-nowrap">
                      <b>{appliedSources.length}</b> sources
                    </span>
                  ) : (
                    appliedSources.map((item, index) => (
                      <span key={item}>
                        <b>
                          {item}
                          {index !== appliedSources.length - 1 ? ", " : ""}
                        </b>
                      </span>
                    ))
                  )}
                </span>
              )}
            </PageTitle>
            <Results />
          </ErrorBoundary>
        </Suspense>
        <FiltersDialog />
      </Layout>
    </>
  );
};

export default SearchResultsPage;
