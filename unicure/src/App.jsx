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

  // Get API key from environment variables or use fallback for development
  const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || 'sk-3a43fbd8e2084f5288e39ff997117679';

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    let messageContent = message;
    let attachmentData = null;

    // Check if the message is in JSON format (contains attachment)
    try {
      const parsedMessage = JSON.parse(message);
      if (parsedMessage.text !== undefined) {
        messageContent = parsedMessage.text;
        attachmentData = parsedMessage.attachment;
      }
    } catch (e) {
      // Not JSON, use as is
      messageContent = message;
    }

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsLoading(true);

    try {
      // Prepare message history for the API
      const messageHistory = messages.concat({ 
        role: 'user', 
        content: messageContent + (attachmentData ? ` [Attached: ${attachmentData.name}]` : '')
      });
      
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
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
      <header className="bg-gradient-to-r from-medical-gradient-start to-medical-gradient-end shadow-md p-4 border-b border-blue-200">
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 6V12C4 15.31 7.58 19.5 12 22C16.42 19.5 20 15.31 20 12V6L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            UniCure
          </h1>
          <div className="text-white text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
            AI Medical Assistant
          </div>
        </div>
      </header>
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