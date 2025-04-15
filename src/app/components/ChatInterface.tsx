'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import FileUpload from './FileUpload';
import LoadingSpinner from './LoadingSpinner';
import { Message } from '../types';
import { Send } from 'lucide-react';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: 'Hello! I\'m your AI medical assistant. I can help answer your medical questions and analyze medical documents. Please note that I\'m not a replacement for professional medical advice. How can I help you today?'
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      try {
        const response = await axios.post('/api/analyze', {
          type: file.type,
          name: file.name,
          content: content
        });
        
        setMessages(prev => [...prev, 
          { role: 'user', content: `Uploaded file: ${file.name}` },
          { role: 'assistant', content: response.data.analysis }
        ]);
      } catch (error) {
        console.error('Error analyzing file:', error);
        setMessages(prev => [...prev, 
          { role: 'assistant', content: 'Sorry, I had trouble analyzing that file. Please try again.' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chat', {
        message: userMessage
      });
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.reply }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, 
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto px-4">
      <div className="flex-1 overflow-y-auto py-4">
        <FileUpload onFileUpload={handleFileUpload} />
        <div className="space-y-4 mt-8">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isLoading && <LoadingSpinner />}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your medical question..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white rounded-lg px-6 py-2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send size={20} />
            {isLoading ? 'Processing...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}
