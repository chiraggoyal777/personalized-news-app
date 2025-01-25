import clsx from "clsx";
import React from "react";

const PageTitle = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={clsx("my-4 text-center text-lg md:text-left", {
        className: className
      })}
    >
      {children}
    </h1>
  );
};

export default PageTitle;
