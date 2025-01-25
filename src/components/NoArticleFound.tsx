import ArticleImage from "./ArticleImage";

const NoArticleFound = ({ text = "No article found" }: { text?: string }) => {
  return (
    <div className="py-6 text-center">
      <div>
        <ArticleImage className="mx-auto max-w-96" asPlaceholder />
      </div>
      <p className="text-medium text-xl font-medium">{text}</p>
    </div>
  );
};

export default NoArticleFound;
