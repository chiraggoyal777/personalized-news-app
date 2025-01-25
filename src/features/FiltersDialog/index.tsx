import { Suspense, useState } from "react";
import LoadingUI from "../../components/LoadingUI";
import ErrorBoundary from "../../ErrorBoundary";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";
import ArticleFilters from "./Filters";
import FloaterButton from "../../components/FloaterButton";
import { useSearchFiltersContext } from "../../contexts/SearchFiltersProvider";
import AppDialog from "../../components/AppDialog";

const FiltersDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { hasAppliedFilters } = useSearchFiltersContext();

  return (
    <AppDialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      title="Filter Results"
      description="By applying filters, you can narrow down the results to your liking."
      trigger={
        <FloaterButton
          tooltipText="Filters"
          icon={<AdjustmentsHorizontalIcon className="size-5" />}
          onClick={() => setIsOpen(true)}
          isActive={hasAppliedFilters}
        />
      }
    >
      <Suspense fallback={<LoadingUI />}>
        <ErrorBoundary>
          <ArticleFilters
            onApplyFilters={() => setIsOpen(false)}
            onClearFilters={() => setIsOpen(false)}
          />
        </ErrorBoundary>
      </Suspense>
    </AppDialog>
  );
};

export default FiltersDialog;
