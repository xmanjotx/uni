const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-[#1A1A1A] rounded-2xl p-4 flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
        </div>
        <span className="text-sm text-gray-400">UniCure is thinking...</span>
      </div>
    </div>
  );
};

export default TypingIndicator;