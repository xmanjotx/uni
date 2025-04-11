export const QuickSuggestions = ({ onSelect }) => {
  const suggestions = [
    "Headache relief?",
    "Allergy advice?",
    "Cold symptoms?",
    "Sleep tips?",
    "Nutrition advice?",
    "Exercise benefits?"
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-4 justify-center">
      {suggestions.map((suggestion, index) => (
        <button
          key={suggestion}
          onClick={() => onSelect(suggestion)}
          className={`px-4 py-2 bg-white text-medical-blue border border-blue-200 rounded-full
                   hover:bg-blue-50 hover:border-medical-blue transition-all duration-200 text-sm
                   shadow-sm hover:shadow-md fade-in`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};