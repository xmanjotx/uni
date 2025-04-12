import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex items-center space-x-3">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-[#1A3B5B] rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-[#1A3B5B] rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
          <div className="w-2 h-2 bg-[#1A3B5B] rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
        </div>
        <span className="text-sm text-gray-600">Analyzing your case...</span>
      </div>
    </div>
  );
};

export default TypingIndicator;