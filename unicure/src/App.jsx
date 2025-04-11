import { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import { QuickSuggestions } from './components/QuickSuggestions';
import { Disclaimer } from './components/Disclaimer';

function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your AI medical assistant. While I can provide general health information, remember I'm not a substitute for professional medical care. How can I help you today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsLoading(true);

    try {
      // Prepare message history for the API
      const messageHistory = messages.concat({ role: 'user', content: message });
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin, // Required for OpenRouter
          'X-Title': 'UniCure AI Medical Assistant' // Optional but recommended
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3-opus', // You can change to other medical models
          messages: messageHistory,
          stream: true,
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let assistantMessage = '';

      // Add an empty assistant message that we'll update
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        // Decode the chunk
        const chunk = decoder.decode(value);
        
        // Process the chunk (SSE format)
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ') && !line.includes('[DONE]')) {
            try {
              const data = JSON.parse(line.substring(6));
              if (data.choices && data.choices[0]?.delta?.content) {
                assistantMessage += data.choices[0].delta.content;
                
                // Update the message in state
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1].content = assistantMessage;
                  return newMessages;
                });
              }
            } catch (e) {
              console.error('Error parsing SSE:', e);
            }
          }
        }
      }
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