/**
 * API Service for communicating with the api.opticure.io backend
 */

const API_URL = 'https://api.opticure.io';

/**
 * Send a message to the AI and get a response
 * @param {string} message - The user's message
 * @param {Array} conversationHistory - Previous messages in the conversation
 * @param {File|null} attachment - Optional file attachment
 * @returns {Promise} - Promise with the AI response
 */
export const sendMessage = async (message, conversationHistory = [], attachment = null) => {
  try {
    const formData = new FormData();
    formData.append('message', message);
    formData.append('conversation', JSON.stringify(conversationHistory));
    
    if (attachment) {
      formData.append('attachment', attachment);
    }

    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

/**
 * Get category-specific information from the AI
 * @param {string} category - The selected category
 * @param {Array} conversationHistory - Previous messages in the conversation
 * @returns {Promise} - Promise with the AI response
 */
export const getCategoryInfo = async (category, conversationHistory = []) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
        conversation: conversationHistory,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting category info:', error);
    throw error;
  }
};

/**
 * Upload health records to the AI system
 * @param {File} file - The health record file
 * @param {Array} conversationHistory - Previous messages in the conversation
 * @returns {Promise} - Promise with the AI response
 */
export const uploadHealthRecord = async (file, conversationHistory = []) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('conversation', JSON.stringify(conversationHistory));

    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading health record:', error);
    throw error;
  }
};