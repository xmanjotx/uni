/**
 * Formats message text to handle markdown-like syntax
 * This is a simple implementation that handles basic markdown elements
 */
export const formatMessageText = (text) => {
  if (!text) return '';
  
  // Replace markdown headings with styled HTML
  let formattedText = text
    // Handle headers
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mt-5 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-5 mb-3">$1</h1>')
    
    // Handle bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    
    // Handle lists
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>')
    
    // Handle horizontal rules
    .replace(/^---$/gm, '<hr class="my-4 border-t border-gray-300" />')
    
    // Handle paragraphs with proper spacing
    .replace(/\n\n/g, '</p><p class="my-2">');
  
  // Wrap in paragraph tags if not already wrapped
  if (!formattedText.startsWith('<h') && !formattedText.startsWith('<p')) {
    formattedText = `<p class="my-2">${formattedText}</p>`;
  }
  
  return formattedText;
};