const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 rounded-lg p-3 flex items-center space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
      </div>
    </div>
  );
};

export default TypingIndicator;