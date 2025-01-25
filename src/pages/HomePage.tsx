import { Suspense } from "react";
import Layout from "../Layout";
import LoadingUI from "../components/LoadingUI";
import ErrorBoundary from "../ErrorBoundary";
import Feeds from "../features/Feeds";
import CustomiseFeedDialog from "../features/CustomiseFeedDialog";
import { Helmet } from "react-helmet-async";
import { APP_TITLE } from "../lib/constants";
import { usePreferencesContext } from "../contexts/PreferencesProvider";
import PageTitle from "../components/PageTitle";
const HomePage = () => {
  const { isPersonalised } = usePreferencesContext();
  return (
    <>
      <Helmet>
        <title>{APP_TITLE} - Home</title>
      </Helmet>
      <Layout>
        <Suspense fallback={<LoadingUI />}>
          <ErrorBoundary>
            <PageTitle>{isPersonalised && "Personalised"} Articles</PageTitle>
            <Feeds />
          </ErrorBoundary>
        </Suspense>
        <CustomiseFeedDialog />
      </Layout>
    </>
  );
};

export default HomePage;
