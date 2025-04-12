import { useState, useRef, useEffect } from 'react';
import TypingIndicator from './TypingIndicator';

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
    }
  };

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0A0A0A] text-white">
      {/* Welcome Message */}
      {messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4 max-w-2xl px-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Welcome to UniCure AI
            </h1>
            <p className="text-gray-400 text-lg">
              Your AI medical assistant. Ask me anything about health and wellness.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-8">
              <button className="p-4 rounded-xl bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-colors text-left">
                <span className="text-blue-400">🤒 Symptom Check</span>
                <p className="text-sm text-gray-400 mt-1">Describe your symptoms for initial guidance</p>
              </button>
              <button className="p-4 rounded-xl bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-colors text-left">
                <span className="text-teal-400">💊 Medication Info</span>
                <p className="text-sm text-gray-400 mt-1">Learn about your medications and possible interactions</p>
              </button>
              <button className="p-4 rounded-xl bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-colors text-left">
                <span className="text-purple-400">🧘 Wellness Tips</span>
                <p className="text-sm text-gray-400 mt-1">Get advice on healthy living and lifestyle</p>
              </button>
              <button className="p-4 rounded-xl bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-colors text-left">
                <span className="text-pink-400">❤️ Mental Health</span>
                <p className="text-sm text-gray-400 mt-1">Support for mental health and well-being</p>
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
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-teal-500'
                    : 'bg-[#1A1A1A]'
                }`}
              >
                <div className="prose prose-invert max-w-none">
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <div className="border-t border-gray-800 bg-[#1A1A1A] p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex items-end gap-4">
            <div className="flex-1 bg-[#2A2A2A] rounded-xl p-2">
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
                placeholder="Ask about your health concerns..."
                className="w-full bg-transparent border-0 focus:ring-0 text-white placeholder-gray-400 resize-none max-h-[200px] min-h-[44px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
                rows="1"
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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