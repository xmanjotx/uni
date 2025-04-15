'use client';

import { useState, useRef, useEffect } from 'react';
import '@/styles/uber.css';
import FileUpload from './FileUpload';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseRef = useRef<string>('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      responseRef.current = '';
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n').filter(line => line.trim().startsWith('data: '));
        
        for (const line of lines) {
          try {
            const jsonStr = line.replace('data: ', '');
            const jsonData = JSON.parse(jsonStr);
            
            if (jsonData.choices?.[0]?.delta?.content) {
              responseRef.current += jsonData.choices[0].delta.content;
              
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  content: responseRef.current,
                };
                return updated;
              });
            }
          } catch (e) {
            console.error('Error parsing SSE chunk:', e);
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
      responseRef.current = '';
    }
  };

  const handleFileUpload = (content: string) => {
    setInput(`Please analyze this medical report:\n\n${content}`);
    setShowUpload(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] max-w-5xl mx-auto p-8 bg-[var(--uber-gray-50)] rounded-2xl shadow-xl border border-[var(--uber-gray-200)]">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center gap-2 mb-3">
          <svg className="w-8 h-8 text-[var(--uber-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <h1 className="text-2xl font-bold text-[var(--uber-gray-900)]">AI Medical Assistant</h1>
        </div>
        <p className="text-[var(--uber-gray-700)] text-lg">Your trusted companion for medical inquiries and report analysis</p>
      </div>

      {!messages.length && (
        <div className="grid grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setInput("What are the common symptoms of COVID-19?")}
            className="p-5 text-left rounded-xl bg-gradient-to-br from-[var(--uber-gray-800)] to-[var(--uber-gray-900)] hover:from-[var(--uber-gray-700)] hover:to-[var(--uber-gray-800)] text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <span className="block font-medium mb-1">COVID-19 Symptoms</span>
            <span className="text-sm opacity-80">Learn about common symptoms</span>
          </button>
          <button
            onClick={() => setInput("What should I know about blood pressure readings?")}
            className="p-5 text-left rounded-xl bg-gradient-to-br from-[var(--uber-gray-800)] to-[var(--uber-gray-900)] hover:from-[var(--uber-gray-700)] hover:to-[var(--uber-gray-800)] text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <span className="block font-medium mb-1">Blood Pressure Guide</span>
            <span className="text-sm opacity-80">Understanding your readings</span>
          </button>
          <button
            onClick={() => setInput("What are the recommended daily nutritional requirements?")}
            className="p-5 text-left rounded-xl bg-gradient-to-br from-[var(--uber-gray-800)] to-[var(--uber-gray-900)] hover:from-[var(--uber-gray-700)] hover:to-[var(--uber-gray-800)] text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <span className="block font-medium mb-1">Daily Nutrition</span>
            <span className="text-sm opacity-80">Essential dietary guidelines</span>
          </button>
          <button
            onClick={() => setInput("How can I improve my sleep quality?")}
            className="p-5 text-left rounded-xl bg-gradient-to-br from-[var(--uber-gray-800)] to-[var(--uber-gray-900)] hover:from-[var(--uber-gray-700)] hover:to-[var(--uber-gray-800)] text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <span className="block font-medium mb-1">Better Sleep</span>
            <span className="text-sm opacity-80">Tips for quality rest</span>
          </button>
        </div>
      )}

      {showUpload && (
        <div className="mb-4">
          <FileUpload onFileUpload={handleFileUpload} />
        </div>
      )}
      <div className="flex-1 overflow-y-auto mb-6 space-y-6 px-4 scroll-smooth">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`uber-message ${message.role === 'user' ? 'uber-message-user' : 'uber-message-assistant'} shadow-sm`}
            >
              <p className="text-base leading-relaxed">{message.content}</p>
              <span className="text-xs opacity-70 mt-2 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="uber-message uber-message-assistant">
              <div className="uber-loading">
                <div className="uber-loading-dot"></div>
                <div className="uber-loading-dot"></div>
                <div className="uber-loading-dot"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-3 mt-2">
        <form onSubmit={handleSubmit} className="flex gap-3 flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your medical question or choose a suggestion above..."
            className="uber-input flex-1 text-base py-3 px-4"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="uber-button px-6 py-3 font-semibold flex items-center gap-2"
          >
            <span>Send</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="uber-button p-2 !bg-[var(--uber-gray-900)] border border-[var(--uber-gray-700)] hover:!bg-[var(--uber-gray-800)]"
          title="Upload medical report"
        >
          <svg
            className="w-6 h-6 text-gray-600 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}