import ChatInterface from '@/components/ChatInterface';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-[var(--uber-white)]">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <header className="mb-12 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 rounded-lg bg-[var(--uber-black)] flex items-center justify-center">
              <svg
                className="w-10 h-10 text-[var(--uber-white)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--uber-black)] tracking-tight">
              AI Medical Assistant
            </h1>
          </div>
        </header>
        <ChatInterface />
      </div>
    </div>
  );
}