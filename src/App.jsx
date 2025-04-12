import { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import Sidebar from './components/Sidebar';
import useChat from './hooks/useChat';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <div className="flex h-screen bg-[#0A0A0A]">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Chat Area */}
      <main className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="flex-1 relative">
          <ChatInterface
            messages={messages}
            onSendMessage={sendMessage}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;