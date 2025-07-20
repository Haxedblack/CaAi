import React from 'react';

const LoadingSpinner = ({ text }) => (
  <div className="flex flex-col items-center justify-center min-h-screen" role="status" aria-live="polite">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 border-opacity-70"></div>
    {text && <p className="mt-4 text-white text-lg font-medium">{text}</p>}
  </div>
);

export default LoadingSpinner;
