/**
 * Utility functions for handling conversations
 */

/**
 * Format a timestamp to a readable time
 * @param {string} timestamp - ISO timestamp string
 * @returns {string} - Formatted time string
 */
export const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Get a greeting based on the time of day
 * @returns {string} - Appropriate greeting
 */
export const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return 'Good morning!';
  } else if (hour >= 12 && hour < 18) {
    return 'Good afternoon!';
  } else {
    return 'Good evening!';
  }
};

/**
 * Format file size to human-readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes < 1024) {
    return bytes + ' bytes';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(1) + ' KB';
  } else {
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
};

/**
 * Check if a file is an allowed type
 * @param {File} file - The file to check
 * @param {Array} allowedTypes - Array of allowed MIME types
 * @returns {boolean} - Whether the file is allowed
 */
export const isAllowedFileType = (file, allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain']) => {
  return allowedTypes.includes(file.type);
};

/**
 * Check if a file is within the size limit
 * @param {File} file - The file to check
 * @param {number} maxSizeBytes - Maximum file size in bytes
 * @returns {boolean} - Whether the file is within the size limit
 */
export const isWithinSizeLimit = (file, maxSizeBytes = 5 * 1024 * 1024) => {
  return file.size <= maxSizeBytes;
};