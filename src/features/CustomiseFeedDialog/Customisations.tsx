import { useEffect, useState } from "react";
import { usePreferencesContext } from "../../contexts/PreferencesProvider";
import { Category, Source } from "../../lib/types";
import LoadingUI from "../../components/LoadingUI";
import Scrollbars from "react-custom-scrollbars-2";
import * as motion from "motion/react-client";
import BubbleCheckbox from "../../components/BubbleCheckbox";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useSources } from "../../hooks/useSources";
import { useCategories } from "../../hooks/useCategories";
import ActionButton from "../../components/ActionButton";
import IconButton from "../../components/IconButton";

interface Props {
  onSavePreferences: () => void;
}

const Customisations = ({ onSavePreferences }: Props) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const { sources, isLoading: isLoadingSources } = useSources();
  const { categories, isLoading: isLoadingCategories } = useCategories();
  const { preferences, handleChangePreferences } = usePreferencesContext();
  const totalSteps = Object.keys(preferences).length;

  const [selectedSources, setSelectedSources] = useState<Source["id"][]>(
    preferences.sources
  );
  const [selectedCategories, setSelectedCategories] = useState<
    Category["id"][]
  >(preferences.categories);

  function handleSavePreferences() {
    const preferences = {
      categories: selectedCategories,
      sources: selectedSources
    };
    handleChangePreferences(preferences);
    setActiveStepIndex(0);
    onSavePreferences();
  }

  useEffect(() => {
    setSelectedSources(preferences.sources);
    setSelectedCategories(preferences.categories);
  }, [preferences]);
  return (
    <>
      {activeStepIndex == 0 && (
        <div className="space-y-4">
          {isLoadingSources ? (
            <LoadingUI />
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h5 className="mb-4 text-center text-lg font-medium text-violet10">
                  Source Preferences
                </h5>
                <Scrollbars autoHeight autoHeightMax="calc(100dvh - 20rem)">
                  <div className="flex flex-wrap justify-center gap-2 text-xs md:text-base">
                    {sources.map((item) => (
                      <BubbleCheckbox
                        key={item.id}
                        item={{
                          id: item.id,
                          label: item.name,
                          group: "preferred-sources"
                        }}
                        checked={selectedSources.includes(item.id)}
                        onChange={(e) =>
                          setSelectedSources((prev) =>
                            e.target.checked
                              ? [...prev, item.id]
                              : prev.filter((itemId) => itemId !== item.id)
                          )
                        }
                      />
                    ))}
                  </div>
                </Scrollbars>
              </motion.div>
            </>
          )}
        </div>
      )}
      {activeStepIndex == 1 && (
        <div className="space-y-4">
          {isLoadingCategories ? (
            <LoadingUI />
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h5 className="mb-4 text-center text-lg font-medium text-violet10">
                  Category Preferences
                </h5>
                <Scrollbars autoHeight autoHeightMax="calc(100dvh - 20rem)">
                  <div className="flex flex-wrap justify-center gap-2 text-xs md:text-base">
                    {categories.map((item) => (
                      <BubbleCheckbox
                        key={item.id}
                        item={{
                          id: item.id,
                          label: item.name,
                          group: "preferred-categories"
                        }}
                        checked={selectedCategories.includes(item.id)}
                        onChange={(e) =>
                          setSelectedCategories((prev) =>
                            e.target.checked
                              ? [...prev, item.id]
                              : prev.filter((itemId) => itemId !== item.id)
                          )
                        }
                      />
                    ))}
                  </div>
                </Scrollbars>
              </motion.div>
            </>
          )}
        </div>
      )}
      {!isLoadingSources && !isLoadingCategories && (
        <div className="mt-6 flex items-center justify-between">
          {activeStepIndex !== 0 ? (
            <IconButton
              onClick={() => setActiveStepIndex((prev) => prev - 1)}
              disabled={activeStepIndex === 0}
              additionalClasses={`flex h-14 w-14 items-center justify-center rounded-full bg-violet3 text-center text-xl text-violet11 ${
                activeStepIndex === 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
              icon={<ArrowLeftIcon className="size-5" />}
            />
          ) : (
            <span></span>
          )}
          {activeStepIndex !== totalSteps - 1 ? (
            <IconButton
              onClick={() => setActiveStepIndex((prev) => prev + 1)}
              disabled={activeStepIndex === totalSteps - 1}
              additionalClasses={`${
                activeStepIndex === totalSteps - 1
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              icon={<ArrowRightIcon className="size-5" />}
            />
          ) : (
            <ActionButton variant="primary" onClick={handleSavePreferences}>
              Finish
            </ActionButton>
          )}
        </div>
      )}
    </>
  );
};

export default Customisations;
