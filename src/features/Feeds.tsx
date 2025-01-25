import { useArticles } from "../hooks/useArticles";
import LoadingUI from "../components/LoadingUI";
import ArticleListItem from "../components/ArticleItem";
import NoArticleFound from "../components/NoArticleFound";
import ArticleVirtualLoader from "../components/ArticleVirtualLoader";
import ArticleContainer, { ArticleContainerGrid } from "../components/Article";
const Feeds = () => {
  const {
    articles,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage
  } = useArticles();
  return isLoading ? (
    <LoadingUI />
  ) : articles.length > 0 ? (
    <ArticleContainer>
      <ArticleContainerGrid>
        {articles.map((article, index) => (
          <ArticleListItem key={index} article={article} />
        ))}
      </ArticleContainerGrid>
      <ArticleVirtualLoader
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </ArticleContainer>
  ) : (
    <NoArticleFound text="No articles found, try customising your feed" />
  );
};

export default Feeds;
