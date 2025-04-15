import ChatInterface from './components/ChatInterface';

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-blue-500 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">AI Doctor Assistant</h1>
          <p className="text-sm mt-1">Real-time Medical Assistance with AI</p>
        </div>
      </header>
      <ChatInterface />
    </main>
  );
}
