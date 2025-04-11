const TypingIndicator = () => {
  return (
    <div className="flex justify-start fade-in">
      <div className="bg-medical-light p-4 rounded-lg rounded-bl-none shadow-sm border border-blue-100">
        <div className="flex space-x-1.5">
          <div className="w-2 h-2 bg-medical-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-medical-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-medical-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;