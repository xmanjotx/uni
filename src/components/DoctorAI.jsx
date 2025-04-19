import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon, PaperClipIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useConversation } from '../context/ConversationContext';

const DoctorAI = () => {
  const [greeting, setGreeting] = useState('');
  const [inputText, setInputText] = useState('');
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  const {
    messages,
    isLoading,
    error,
    sendUserMessage,
    selectCategory,
    uploadRecord,
    clearConversation
  } = useConversation();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Good morning!');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good afternoon!');
    } else {
      setGreeting('Good evening!');
    }
  }, []);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const categories = [
    { id: 1, title: 'Health Assessment' },
    { id: 2, title: 'Medical Advice' },
    { id: 3, title: 'Mental Health' },
    { id: 4, title: 'Wellness & Lifestyle' },
    { id: 5, title: 'Emergency Help' },
    { id: 6, title: 'Health Records' },
  ];
  
  const handleSendMessage = () => {
    if (inputText.trim() || attachment) {
      sendUserMessage(inputText, attachment);
      setInputText('');
      setAttachment(null);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };
  
  const handleCategoryClick = (category) => {
    selectCategory(category.title);
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleRemoveAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-white p-2 md:p-6 flex flex-col">
      {/* Header Section */}
      <header className="flex flex-col items-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mb-3 avatar-pulse"
        >
          <span className="text-2xl">👨‍⚕️</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-uber font-medium text-center"
        >
          {greeting} How can I assist you today?
        </motion.h1>
      </header>

      {/* Main Content - Grid of Buttons (only show if no messages yet) */}
      {messages.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-8"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              className="py-2 border border-black rounded-lg bg-white text-black button-hover"
              onClick={() => handleCategoryClick(category)}
            >
              <h3 className="text-lg font-uber font-medium">{category.title}</h3>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Chat Messages */}
      {messages.length > 0 && (
        <div className="flex-1 overflow-y-auto mb-20 px-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div
                className={`inline-block max-w-[80%] md:max-w-[70%] p-3 rounded-lg ${message.sender === 'user' ? 'bg-black text-white' : 'bg-gray-100 text-black border border-black'}`}
              >
                <p className="font-uber">{message.text}</p>
                {message.attachment && (
                  <div className="mt-2 p-2 bg-gray-200 rounded text-black text-sm">
                    <p>📎 {message.attachment.name}</p>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ))}
          {isLoading && (
            <div className="text-left mb-4">
              <div className="inline-block max-w-[80%] md:max-w-[70%] p-3 rounded-lg bg-gray-100 text-black border border-black">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="text-center mb-4">
              <div className="inline-block p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
                <p>{error}</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Chat Input Section */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-black">
        <div className="max-w-4xl mx-auto">
          {/* Attachment Preview */}
          {attachment && (
            <div className="mb-2 p-2 bg-gray-100 rounded-lg flex justify-between items-center">
              <span className="text-sm truncate">{attachment.name}</span>
              <button onClick={handleRemoveAttachment} className="text-gray-500 hover:text-red-500">
                <XCircleIcon className="w-5 h-5" />
              </button>
            </div>
          )}
          
          <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              className="p-2 border border-black rounded-lg button-hover"
              aria-label="Upload file"
              onClick={handleUploadClick}
            >
              <PaperClipIcon className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question here..."
              className="flex-1 p-2 border border-black rounded-lg font-uber text-lg focus:outline-none focus:ring-2 focus:ring-black"
              disabled={isLoading}
            />
            <button
              className="p-2 border border-black rounded-lg button-hover"
              aria-label="Send message"
              onClick={handleSendMessage}
              disabled={isLoading || (!inputText.trim() && !attachment)}
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAI;