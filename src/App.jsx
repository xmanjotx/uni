import { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import useChat from './hooks/useChat';

const App = () => {
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <div className="flex h-screen bg-background">
      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        <ChatInterface
          messages={messages}
          onSendMessage={sendMessage}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default App;