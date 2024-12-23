import React from "react";

function Skeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-12 w-96 animate-pulse items-center rounded-lg bg-gray-200 dark:bg-gray-700">
        <div className="ml-4 h-6 w-36 animate-pulse rounded-lg bg-gray-300 dark:bg-gray-600" />
      </div>
      <div className="h-96 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"></div>
      <div className="h-96 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"></div>
    </div>
  );
}

export default Skeleton;
