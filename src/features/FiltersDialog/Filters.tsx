import React, { useState } from "react";
import Select, { Theme } from "react-select";
import { DateRangePicker, Range } from "react-date-range";
import { useSources } from "../../hooks/useSources";
import { useSearchFiltersContext } from "../../contexts/SearchFiltersProvider";
import LoadingUI from "../../components/LoadingUI";
import Scrollbars from "react-custom-scrollbars-2";
import ActionButton from "../../components/ActionButton";

const appTheme = (theme: Theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: "#6550B9"
  }
});
interface Props {
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

const ArticleFilters: React.FC<Props> = ({
  onApplyFilters,
  onClearFilters
}) => {
  const { sources, isLoading: isLoadingSources } = useSources();
  const {
    filters,
    hasAppliedFilters,
    handleUpdateFilters,
    handleClearFilters
  } = useSearchFiltersContext();

  const [selectedSources, setSelectedSources] = useState<string[]>(
    filters.sources
  );
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(filters.from || new Date()),
    endDate: new Date(filters.to || new Date()),
    key: "selection"
  });

  const sourceOptions = sources.map((source: { id: string; name: string }) => ({
    value: source.id,
    label: source.name
  }));

  // Helper to format dates to YYYY-MM-DD
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleApplyFilters = () => {
    const formattedDateRange = {
      startDate: formatDate(dateRange.startDate!),
      endDate: formatDate(dateRange.endDate!)
    };

    handleUpdateFilters({
      sources: selectedSources,
      from: formattedDateRange.startDate,
      to: formattedDateRange.endDate
    });
    onApplyFilters();
  };

  const clearFilters = () => {
    handleClearFilters();
    onClearFilters();
  };

  return isLoadingSources ? (
    <LoadingUI />
  ) : (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleApplyFilters();
      }}
      className="space-y-6"
    >
      <Scrollbars autoHeight autoHeightMax="calc(100dvh - 20rem)">
        <div className="space-y-4 pr-2">
          {/* Multi-Select Dropdown */}
          <div>
            <label className="text-gray-700 mb-2 block font-medium">
              Sources
            </label>
            <Select
              theme={appTheme}
              options={sourceOptions}
              isLoading={isLoadingSources}
              isMulti
              value={sourceOptions.filter((option) =>
                selectedSources.includes(option.value)
              )}
              onChange={(selectedOptions) =>
                setSelectedSources(
                  selectedOptions.map((option) => option.value)
                )
              }
              placeholder="Select sources..."
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          {/* Date Range Picker */}
          <div>
            <label className="text-gray-700 mb-2 block font-medium">
              Date Range
            </label>
            <DateRangePicker
              ranges={[dateRange]}
              onChange={(ranges) => setDateRange(ranges.selection)}
              // className="rounded-lg border border-gray-300"
              rangeColors={["#6550B9"]}
            />
          </div>
        </div>
      </Scrollbars>

      {/* Apply Filters Button */}
      <div className="flex items-center justify-end gap-2">
        {hasAppliedFilters && (
          <ActionButton type="button" onClick={clearFilters}>
            Clear Filters
          </ActionButton>
        )}
        <ActionButton type="submit" variant="primary">
          Apply Filters
        </ActionButton>
      </div>
    </form>
  );
};

export default ArticleFilters;
