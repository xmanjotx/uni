import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon, PaperClipIcon, XCircleIcon, HomeIcon } from '@heroicons/react/24/outline';
import { useConversation } from '../context/ConversationContext';
import { formatMessageText } from '../utils/markdown/formatMessage';

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
      <header className="flex flex-col items-center py-6 relative bg-gray-50 border-b border-gray-200 shadow-sm">
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mb-3 avatar-pulse bg-white shadow-md"
        >
          <span className="text-2xl">👨‍⚕️</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-uber font-medium text-center px-4"
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
              <p className="text-gray-600 mb-6 text-center max-w-lg mx-auto">Select a category or type a question to get started</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl mx-auto">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    className="py-4 px-3 border-2 border-black rounded-lg bg-white text-black button-hover shadow-sm hover:shadow-md transition-all"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <h3 className="text-lg font-uber font-medium">{category.title}</h3>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Chat Messages */
            <div className="flex-1 overflow-y-auto py-6 px-2 space-y-6" style={{ maxHeight: 'calc(100vh - 220px)' }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] md:max-w-[75%] ${message.sender === 'user' ? 'mr-1' : 'ml-1'}`}>
                    <div
                      className={`p-4 rounded-lg shadow-md ${message.sender === 'user' ? 'bg-black text-white rounded-tr-none' : 'bg-gray-100 text-black border border-gray-200 rounded-tl-none'}`}
                    >
                      {message.sender === 'user' ? (
                        <p className="font-uber">{message.text}</p>
                      ) : (
                        <div 
                          className="font-uber message-content"
                          dangerouslySetInnerHTML={{ __html: formatMessageText(message.text) }}
                        />
                      )}
                      {message.attachment && (
                        <div className="mt-2 p-2 bg-gray-200 rounded text-black text-sm flex items-center">
                          <span className="mr-2">📎</span>
                          <p className="truncate">{message.attachment.name}</p>
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
                  <div className="max-w-[85%] md:max-w-[75%] ml-1">
                    <div className="p-4 rounded-lg bg-gray-100 text-black border border-gray-200 flex items-center gap-2 shadow-md">
                      <svg className="animate-spin h-5 w-5 text-black mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      <span className="font-uber text-sm text-gray-700">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <div className="flex justify-center">
                  <div className="p-4 rounded-lg bg-red-100 text-red-700 border border-red-300 shadow-md max-w-md">
                    <p className="font-medium">{error}</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Chat Input Section */}
      <div className="border-t border-gray-200 p-4 bg-white shadow-lg">
        <div className="max-w-4xl mx-auto">
          {/* Attachment Preview */}
          {attachment && (
            <div className="mb-3 p-3 bg-gray-100 rounded-lg flex justify-between items-center border border-gray-200">
              <span className="text-sm truncate font-medium flex items-center">
                <span className="mr-2">ud83dudcce</span>
                {attachment.name}
              </span>
              <button 
                onClick={handleRemoveAttachment} 
                className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-200"
                aria-label="Remove attachment"
              >
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
              className="p-2 border border-black rounded-lg button-hover w-12 h-12 flex items-center justify-center"
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
              className="flex-1 p-3 border border-black rounded-lg font-uber text-lg focus:outline-none focus:ring-2 focus:ring-black"
              disabled={isLoading || isRestarting}
            />
            <button
              className="p-2 border border-black rounded-lg button-hover w-12 h-12 flex items-center justify-center"
              aria-label="Send message"
              onClick={handleSendMessage}
              disabled={isLoading || isRestarting || (!inputText.trim() && !attachment)}
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
            {messages.length > 0 && (
              <button
                onClick={handleClearConversation}
                className="p-2 border border-black rounded-lg button-hover ml-1 w-12 h-12 flex items-center justify-center"
                aria-label="Restart conversation"
                title="Restart conversation"
                disabled={isRestarting}
              >
                <HomeIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAI;