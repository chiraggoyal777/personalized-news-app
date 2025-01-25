import React from "react";

interface LoadingUIProps {
  text?: string;
}

const LoadingUI: React.FC<LoadingUIProps> = ({ text }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-3 p-4">
      <div className="flex items-center justify-center py-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
      {text && <p className="text-sm font-medium text-primary">{text}</p>}
    </div>
  );
};

export default LoadingUI;
