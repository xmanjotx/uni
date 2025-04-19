import { createContext, useContext, useState, useEffect } from 'react';
import { sendTextQuery, uploadFile } from '../services/apiService';

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
   * Send a user message to the AI (text or file)
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
      let response;
      if (attachment) {
        // File size validation (1 MB limit)
        if (attachment.size > 1024 * 1024) {
          throw new Error('The uploaded file exceeds the maximum size limit of 1 MB.');
        }
        response = await uploadFile(attachment);
      } else {
        response = await sendTextQuery(text);
      }
      // Add AI response to the conversation
      const aiMessage = {
        id: Date.now() + 1,
        text: response.message,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };


      setMessages([...updatedMessages, aiMessage]);
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
      console.error('Error in sendUserMessage:', err);
    } finally {
      setIsLoading(false);
    }
  };
  /**
   * Handle category selection (send as text query)
   */
  const selectCategory = async (category) => {
    await sendUserMessage(`I'd like information about ${category}`);
  };

  /**
   * Upload a health record (file)
   */
  const uploadRecord = async (file) => {
    await sendUserMessage('', file);
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