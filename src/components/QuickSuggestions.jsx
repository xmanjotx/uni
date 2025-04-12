const suggestions = [
  "Headache relief?",
  "Allergy advice?",
  "Cold symptoms?",
  "Sleep tips?",
  "Stress management?"
];

const QuickSuggestions = ({ onSelect }) => {
  return (
    <div className="my-4 flex flex-wrap gap-2 justify-center">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className="px-4 py-2 bg-white text-blue-600 rounded-full border border-blue-200 hover:bg-blue-50 transition-colors"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default QuickSuggestions;