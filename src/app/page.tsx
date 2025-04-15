import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--uber-white)]">
      <main className="max-w-4xl mx-auto px-4 py-16 sm:py-24 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-lg bg-[var(--uber-black)] flex items-center justify-center mb-8">
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
        
        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--uber-black)] mb-6">
          Your AI Medical Assistant
        </h1>
        
        <p className="text-xl text-[var(--uber-gray-600)] mb-12 max-w-2xl">
          Get instant medical insights, analyze reports, and receive personalized health guidance through our advanced AI system.
        </p>
        
        <Link
          href="/chat"
          className="uber-button inline-flex items-center text-lg font-semibold"
        >
          Start Consultation
          <svg
            className="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
          <div className="p-6 rounded-xl bg-[var(--uber-gray-50)] shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-[var(--uber-black)]">Real-time Assistance</h3>
            <p className="text-[var(--uber-gray-600)]">Get immediate responses to your medical questions and concerns.</p>
          </div>
          <div className="p-6 rounded-xl bg-[var(--uber-gray-50)] shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-[var(--uber-black)]">Report Analysis</h3>
            <p className="text-[var(--uber-gray-600)]">Upload and analyze medical reports for quick insights and understanding.</p>
          </div>
          <div className="p-6 rounded-xl bg-[var(--uber-gray-50)] shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-[var(--uber-black)]">24/7 Availability</h3>
            <p className="text-[var(--uber-gray-600)]">Access medical guidance anytime, anywhere with our AI assistant.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
