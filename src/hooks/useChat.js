import { useState } from 'react';

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message) => {
    try {
      setIsLoading(true);
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

      // Format the response with bullet points
      const formattedResponse = botMessage
        .split('\n')
        .map(line => line.trim())
        .map(line => line.startsWith('-') ? `•${line.substring(1)}` : line)
        .join('\n');

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: formattedResponse 
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '• Sorry, I encountered an error. Please try again.\n• If the issue persists, please refresh the page.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage
  };
};

export default useChat;