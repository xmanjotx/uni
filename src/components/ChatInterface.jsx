import React, { useState, useRef, useEffect } from 'react';
import TypingIndicator from './TypingIndicator.jsx';

const ChatInterface = ({ messages, onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Welcome Message */}
      {messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-6 max-w-2xl">
            <h1 className="text-4xl font-bold text-[#1A3B5B]">
              Welcome to Opticure AI
            </h1>
            <p className="text-gray-600 text-lg">
              Your professional medical consultation assistant
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all text-left border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🏥</span>
                  <span className="text-[#1A3B5B] font-semibold">Symptom Check</span>
                </div>
                <p className="text-sm text-gray-600">Detailed symptom analysis</p>
              </button>
              <button className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all text-left border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">💊</span>
                  <span className="text-[#1A3B5B] font-semibold">Medications</span>
                </div>
                <p className="text-sm text-gray-600">Medication information</p>
              </button>
              <button className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all text-left border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📋</span>
                  <span className="text-[#1A3B5B] font-semibold">Health Guide</span>
                </div>
                <p className="text-sm text-gray-600">Medical recommendations</p>
              </button>
              <button className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all text-left border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🧠</span>
                  <span className="text-[#1A3B5B] font-semibold">Mental Health</span>
                </div>
                <p className="text-sm text-gray-600">Mental wellness support</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-xl p-4 ${
                  message.role === 'user'
                    ? 'bg-[#1A3B5B] text-white'
                    : 'bg-white shadow-md border border-gray-100'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                    <span className="text-[#1A3B5B] font-semibold">Opticure AI</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-[#1A3B5B]">Medical AI</span>
                  </div>
                )}
                <div className="space-y-2">
                  {message.content.split('\n').map((line, i) => (
                    <p key={i} className={line.startsWith('•') ? 'flex items-start gap-2' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <div className="border-t border-gray-200 bg-white p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex items-end gap-4">
            <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 p-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  autoResizeTextarea();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Describe your health concern..."
                className="w-full bg-transparent border-0 focus:ring-0 text-gray-800 placeholder-gray-400 resize-none max-h-[200px] min-h-[44px]"
                rows="1"
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 rounded-xl bg-[#1A3B5B] text-white hover:bg-[#2C4F7A] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;