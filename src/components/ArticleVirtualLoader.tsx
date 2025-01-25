import React, { useEffect } from "react";
import LoadingUI from "./LoadingUI";
import { useInView } from "react-intersection-observer";

interface ArticleVirtualLoaderProps {
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

const ArticleVirtualLoader: React.FC<ArticleVirtualLoaderProps> = ({
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage
}) => {
  const { ref: loadMoreRef, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div ref={loadMoreRef} className="py-4 text-center">
      {isFetchingNextPage && <LoadingUI text="Loading more articles..." />}

      {!hasNextPage && (
        <p className="text-gray-500">No more articles to load.</p>
      )}
    </div>
  );
};

export default ArticleVirtualLoader;
