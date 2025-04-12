import { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import QuickSuggestions from './components/QuickSuggestions';
import Disclaimer from './components/Disclaimer';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message) => {
    try {
      setIsLoading(true);
      // Add user message to chat
      setMessages(prev => [...prev, { role: 'user', content: message }]);

      const payload = {
        messages: [...messages, { role: 'user', content: message }],
        model: 'claude-3-opus-20240229',
        temperature: 0.7,
        stream: true
      };

      const response = await fetch('https://api.opticure.io', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const botMessage = data.choices[0].message.content;

      setMessages(prev => [...prev, { role: 'assistant', content: botMessage }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto max-w-4xl p-4">
        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
        <QuickSuggestions onSelect={handleSendMessage} />
        <Disclaimer />
      </main>
    </div>
  );
}

export default App;