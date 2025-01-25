import React from "react";

const ArticleContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="@container/articles">{children}</div>;
};
export const ArticleContainerGrid = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <ul className="grid grid-cols-1 bg-white @lg/articles:grid-cols-2 @7xl/articles:grid-cols-3">
      {children}
    </ul>
  );
};

export default ArticleContainer;
