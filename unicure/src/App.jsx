import { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import { QuickSuggestions } from './components/QuickSuggestions';
import { Disclaimer } from './components/Disclaimer';

function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I'm your AI medical assistant. While I can provide general health information, remember I'm not a substitute for professional medical care. How can I help you today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsLoading(true);

    try {
      // TODO: Implement OpenRouter API call
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3-opus',
          messages: messages.concat({ role: 'user', content: message }),
          stream: true,
        }),
      });

      // Handle streaming response
      // TODO: Implement streaming logic

      setMessages(prev => [...prev, { role: 'assistant', content: 'This is a placeholder response. API integration pending.' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-medical-light">
      <main className="flex-1 container mx-auto max-w-4xl p-4 flex flex-col">
        <ChatInterface 
          messages={messages}
          isLoading={isLoading}
          onSendMessage={handleSendMessage}
        />
        <QuickSuggestions onSelect={handleSendMessage} />
      </main>
      <Disclaimer />
    </div>
  );
}

export default App;