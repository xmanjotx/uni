import { useState } from 'react';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Array<{sender: 'user' | 'ai', content: string}>>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = { sender: 'user' as const, content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // TODO: Implement DeepSeek API call
      const aiMessage = { sender: 'ai' as const, content: 'AI response placeholder' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <MessageBubble key={index} sender={message.sender} content={message.content} />
        ))}
        {isLoading && <Loader />}
      </div>
      <MessageInput 
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSendMessage}
      />
    </div>
  );
}