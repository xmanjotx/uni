import React from 'react';
import ChatInterface from './components/ChatInterface.jsx';
import useChat from './hooks/useChat.js';

function App() {
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <div className="flex h-screen bg-background">
      <main className="flex-1 flex flex-col">
        <ChatInterface
          messages={messages}
          onSendMessage={sendMessage}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

export default App;