export const QuickSuggestions = ({ onSelect }) => {
  const suggestions = [
    "Headache relief?",
    "Allergy advice?",
    "Cold symptoms?",
    "Sleep tips?"
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-4 justify-center">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => onSelect(suggestion)}
          className="px-4 py-2 bg-white text-medical-blue border border-medical-blue rounded-full
                   hover:bg-medical-blue hover:text-white transition-colors text-sm"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};