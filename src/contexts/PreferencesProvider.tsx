import { createContext, useContext, useEffect, useState } from "react";
import { Category, Source } from "../lib/types";

type Preferences = {
  sources: Source["id"][];
  categories: Category["id"][];
};

type PreferencesContextType = {
  preferences: Preferences;
  isLoading: boolean;
  isPersonalised: boolean;
  handleChangePreferences: (preferences: Preferences) => void;
};

export const PreferencesContext = createContext<
  PreferencesContextType | undefined
>(undefined);

export default function PreferencesProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const initialPreferences = { categories: [], sources: [] };
  const [isLoading, setIsLoading] = useState(true);

  const [preferences, setPreferences] =
    useState<Preferences>(initialPreferences);
  const isPersonalised =
    preferences.categories.length > 0 || preferences.sources.length > 0;

  function handleChangePreferences(preferences: Preferences) {
    localStorage.setItem("feedPreferences", JSON.stringify(preferences));
    setPreferences(preferences);
  }

  useEffect(() => {
    setIsLoading(false);
    return () => {
      setIsLoading(true);
    };
  }, []);

  useEffect(() => {
    const preferences = JSON.parse(
      localStorage.getItem("feedPreferences") ||
        JSON.stringify(initialPreferences)
    ) as { categories: Category["id"][]; sources: Source["id"][] };
    setPreferences(preferences);
  }, []);

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        isPersonalised,
        isLoading,
        handleChangePreferences
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export const usePreferencesContext = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error(
      "usePreferencesContext must be used within a PreferencesProvider"
    );
  }
  return context;
};
