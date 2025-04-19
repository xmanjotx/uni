import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon, PaperClipIcon, XCircleIcon, HomeIcon } from '@heroicons/react/24/outline';
import { useConversation } from '../context/ConversationContext';

const DoctorAI = () => {
  const [greeting, setGreeting] = useState('');
  const [inputText, setInputText] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [isRestarting, setIsRestarting] = useState(false);
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
  
  const handleClearConversation = () => {
    if (window.confirm('Are you sure you want to restart the conversation? This will clear all messages.')) {
      setIsRestarting(true);
      setTimeout(() => {
        clearConversation();
        setIsRestarting(false);
      }, 500); // Short delay for visual feedback
    }
  };
  
  const handleRemoveAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header Section */}
      <header className="flex flex-col items-center py-6 relative">
        {messages.length > 0 && (
          <button 
            onClick={handleClearConversation}
            className="absolute right-4 top-4 p-2 bg-white border border-gray-200 rounded-full shadow-sm button-hover flex items-center gap-2"
            aria-label="Restart conversation"
            title="Restart conversation"
            disabled={isRestarting}
            style={{ transition: 'background 0.2s, box-shadow 0.2s' }}
          >
            <HomeIcon className="w-5 h-5 text-gray-700" />
            <span className="hidden sm:inline text-gray-700 font-medium">Restart</span>
          </button>
        )}
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
        <div className="w-full max-w-4xl px-4 flex-1 flex flex-col">
          {/* Category Buttons (only show if no messages yet) */}
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center justify-center flex-1 py-8"
            >
              <p className="text-gray-500 mb-6 text-center">Select a category or type a question to get started</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    className="py-3 border border-black rounded-lg bg-white text-black button-hover shadow-sm"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <h3 className="text-lg font-uber font-medium">{category.title}</h3>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Chat Messages */
            <div className="flex-1 overflow-y-auto py-6 px-2 space-y-4" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-[80%] md:max-w-[70%]">
                    <div
                      className={`p-3 rounded-lg ${message.sender === 'user' ? 'bg-black text-white' : 'bg-gray-100 text-black border border-black'}`}
                    >
                      <p className="font-uber">{message.text}</p>
                      {message.attachment && (
                        <div className="mt-2 p-2 bg-gray-200 rounded text-black text-sm">
                          <p>📎 {message.attachment.name}</p>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 text-right">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] md:max-w-[70%]">
                    <div className="p-3 rounded-lg bg-gray-100 text-black border border-black">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <div className="flex justify-center">
                  <div className="p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
                    <p>{error}</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Chat Input Section */}
      <div className="border-t border-black p-4 bg-white">
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
              disabled={isLoading || isRestarting}
            >
              <PaperClipIcon className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={messages.length === 0 ? "Type a question or select a category above..." : "Type your question here..."}
              className="flex-1 p-2 border border-black rounded-lg font-uber text-lg focus:outline-none focus:ring-2 focus:ring-black"
              disabled={isLoading || isRestarting}
            />
            <button
              className="p-2 border border-black rounded-lg button-hover"
              aria-label="Send message"
              onClick={handleSendMessage}
              disabled={isLoading || isRestarting || (!inputText.trim() && !attachment)}
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