export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
      <span className="ml-2 text-gray-600">AI is thinking...</span>
    </div>
  );
}
