import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon, PaperClipIcon } from '@heroicons/react/24/outline';

const DoctorAI = () => {
  const [greeting, setGreeting] = useState('');

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

  const categories = [
    { id: 1, title: 'Health Assessment' },
    { id: 2, title: 'Medical Advice' },
    { id: 3, title: 'Mental Health' },
    { id: 4, title: 'Wellness & Lifestyle' },
    { id: 5, title: 'Emergency Help' },
    { id: 6, title: 'Health Records' },
  ];

  return (
    <div className="min-h-screen bg-white p-2 md:p-6">
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

      {/* Main Content - Grid of Buttons */}
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
          >
            <h3 className="text-lg font-uber font-medium">{category.title}</h3>
          </motion.button>
        ))}
      </motion.div>

      {/* Chat Input Section */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-black">
        <div className="max-w-4xl mx-auto flex gap-2">
          <button
            className="p-2 border border-black rounded-lg button-hover"
            aria-label="Upload file"
          >
            <PaperClipIcon className="w-5 h-5" />
          </button>
          <input
            type="text"
            placeholder="Type your question here..."
            className="flex-1 p-2 border border-black rounded-lg font-uber text-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            className="p-2 border border-black rounded-lg button-hover"
            aria-label="Send message"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorAI;