import React from "react";

interface ErrorUIProps {
  text: string;
}

const ErrorUI: React.FC<ErrorUIProps> = ({ text }) => {
  return (
    <div className="border-danger bg-danger-light my-4 flex w-full flex-col items-center justify-center rounded-lg border p-4">
      <div className="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-danger h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.364 5.636a9 9 0 11-12.728 12.728A9 9 0 0118.364 5.636zM12 8v4m0 4h.01"
          />
        </svg>
        {/* <span className="text-danger font-medium text-lg">Error</span> */}
      </div>
      <p className="text-danger mt-2 text-center text-sm font-medium">{text}</p>
    </div>
  );
};

export default ErrorUI;
