import React from "react";
import { FallbackProps } from "react-error-boundary";

function ErrorBasicFallBack({
  error,
  resetErrorBoundary,
  pageTitle,
}: FallbackProps & { pageTitle: string }) {
  return (
    <div
      className="flex flex-col justify-center items-center bg-red-200 p-4 rounded-md text-center"
      role="alert"
    >
      <p className="text-red-900 font-semibold">
        Something went wrong on the page: {pageTitle}
      </p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button
        onClick={() => {
          resetErrorBoundary();
        }}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Retry
      </button>
    </div>
  );
}

export default ErrorBasicFallBack;
