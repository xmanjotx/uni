import { createContext, useContext, useState, useEffect } from 'react';
import { sendMessage, getCategoryInfo, uploadHealthRecord } from '../services/apiService';

const ConversationContext = createContext();

export const useConversation = () => useContext(ConversationContext);

export const ConversationProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load conversation from localStorage on initial render
  useEffect(() => {
    const savedConversation = localStorage.getItem('conversation');
    if (savedConversation) {
      try {
        setMessages(JSON.parse(savedConversation));
      } catch (e) {
        console.error('Error parsing saved conversation:', e);
        localStorage.removeItem('conversation');
      }
    }
  }, []);

  // Save conversation to localStorage whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('conversation', JSON.stringify(messages));
    }
  }, [messages]);

  /**
   * Send a user message to the AI
   */
  const sendUserMessage = async (text, attachment = null) => {
    if (!text.trim() && !attachment) return;

    setIsLoading(true);
    setError(null);

    // Add user message to the conversation
    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
      attachment: attachment ? {
        name: attachment.name,
        type: attachment.type,
        size: attachment.size
      } : null
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    try {
      // Send to API
      const response = await sendMessage(text, messages, attachment);
      
      // Add AI response to the conversation
      const aiMessage = {
        id: Date.now() + 1,
        text: response.message,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      
      setMessages([...updatedMessages, aiMessage]);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Error in sendUserMessage:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle category selection
   */
  const selectCategory = async (category) => {
    setIsLoading(true);
    setError(null);

    // Add category selection as a user message
    const userMessage = {
      id: Date.now(),
      text: `I'd like information about ${category}`,
      sender: 'user',
      timestamp: new Date().toISOString(),
      category
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    try {
      // Get category info from API
      const response = await getCategoryInfo(category, messages);
      
      // Add AI response to the conversation
      const aiMessage = {
        id: Date.now() + 1,
        text: response.message,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      
      setMessages([...updatedMessages, aiMessage]);
    } catch (err) {
      setError(`Failed to get information about ${category}. Please try again.`);
      console.error('Error in selectCategory:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Upload a health record
   */
  const uploadRecord = async (file) => {
    if (!file) return;

    setIsLoading(true);
    setError(null);

    // Add upload action as a user message
    const userMessage = {
      id: Date.now(),
      text: `I'm uploading my health record: ${file.name}`,
      sender: 'user',
      timestamp: new Date().toISOString(),
      attachment: {
        name: file.name,
        type: file.type,
        size: file.size
      }
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    try {
      // Upload to API
      const response = await uploadHealthRecord(file, messages);
      
      // Add AI response to the conversation
      const aiMessage = {
        id: Date.now() + 1,
        text: response.message,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      
      setMessages([...updatedMessages, aiMessage]);
    } catch (err) {
      setError('Failed to upload health record. Please try again.');
      console.error('Error in uploadRecord:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Clear the conversation history
   */
  const clearConversation = () => {
    setMessages([]);
    localStorage.removeItem('conversation');
  };

  const value = {
    messages,
    isLoading,
    error,
    sendUserMessage,
    selectCategory,
    uploadRecord,
    clearConversation
  };

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
};