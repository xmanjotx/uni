/**
 * API Service for communicating with the api.opticure.io backend
 */

const API_BASE_URL = 'https://api.opticure.io';

/**
 * Send a text query to the AI
 * @param {string} query - The user's question
 * @returns {Promise} - Promise with the AI response
 */
export const sendTextQuery = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    if (!response.ok || data.error) {
      throw new Error(data.message || 'API error');
    }
    return data;
  } catch (error) {
    console.error('Error sending text query:', error);
    throw error;
  }
};

/**
 * Upload a file for analysis
 * @param {File} file - The file to upload
 * @returns {Promise} - Promise with the AI response
 */
export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_BASE_URL}/file`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (!response.ok || data.error) {
      throw new Error(data.message || 'API error');
    }
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Health check endpoint
 * @returns {Promise} - Promise with the health check response
 */
export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'GET',
    });
    const data = await response.json();
    if (!response.ok || data.error) {
      throw new Error(data.message || 'API error');
    }
    return data;
  } catch (error) {
    console.error('Error in health check:', error);
    throw error;
  }
};
