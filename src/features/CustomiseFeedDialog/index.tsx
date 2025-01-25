import { Suspense, useState } from "react";
import LoadingUI from "../../components/LoadingUI";
import ErrorBoundary from "../../ErrorBoundary";
import Customisations from "./Customisations";
import { PaintBrushIcon } from "@heroicons/react/20/solid";
import FloaterButton from "../../components/FloaterButton";
import { usePreferencesContext } from "../../contexts/PreferencesProvider";
import AppDialog from "../../components/AppDialog";

const CustomiseFeedDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { preferences } = usePreferencesContext();

  return (
    <AppDialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      trigger={
        <FloaterButton
          tooltipText="Customise Feed"
          icon={<PaintBrushIcon className="size-5" />}
          onClick={() => setIsOpen(true)}
          isActive={
            preferences.categories.length > 0 || preferences.sources.length > 0
          }
        />
      }
      title={"Customise Feed"}
      description={
        "Choose your taste to customise the feeds as per your interests."
      }
    >
      <Suspense fallback={<LoadingUI />}>
        <ErrorBoundary>
          <Customisations onSavePreferences={() => setIsOpen(false)} />
        </ErrorBoundary>
      </Suspense>
    </AppDialog>
  );
};

export default CustomiseFeedDialog;
