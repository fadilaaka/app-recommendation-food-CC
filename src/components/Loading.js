import React from "react";

const Loading = ({ className }) => {
  return (
    <button
      type="button"
      disabled
      className={`inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-2 rounded border border-blue-700 bg-blue-700 px-3 py-2 text-sm font-medium text-white transition hover:border-blue-800 hover:bg-blue-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:pointer-events-none disabled:opacity-75 ${className}`}
    >
      <svg className="h-4 w-4 animate-spin" viewBox="3 3 18 18">
        <path
          className="fill-blue-800"
          d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
        ></path>
        <path
          className="fill-blue-100"
          d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
        ></path>
      </svg>
      <span>Loading...</span>
    </button>
  );
};

export default Loading;
