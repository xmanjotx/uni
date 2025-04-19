/**
 * Formats message text to handle markdown-like syntax
 * This is a simple implementation that handles basic markdown elements
 */
export const formatMessageText = (text) => {
  if (!text) return '';
  
  // First, handle the special case of triple dashes used as section separators
  text = text.replace(/---/g, '<hr class="my-4 border-t border-gray-300" />');
  
  // Split the text into paragraphs
  const paragraphs = text.split(/\n\n+/);
  
  // Process each paragraph
  const processedParagraphs = paragraphs.map(paragraph => {
    // Skip empty paragraphs
    if (!paragraph.trim()) return '';
    
    // Check if this paragraph is a header
    if (paragraph.trim().startsWith('###')) {
      return paragraph
        .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');
    } else if (paragraph.trim().startsWith('##')) {
      return paragraph
        .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mt-5 mb-2">$1</h2>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');
    } else if (paragraph.trim().startsWith('#')) {
      return paragraph
        .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-5 mb-3">$1</h1>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');
    }
    
    // Check if this paragraph is a list
    if (paragraph.trim().startsWith('-') || /^\d+\./.test(paragraph.trim())) {
      // Split into lines
      const lines = paragraph.split('\n');
      const listItems = lines.map(line => {
        if (line.trim().startsWith('-')) {
          return line.replace(/^- (.+)$/g, '<li class="ml-4 list-disc">$1</li>');
        } else if (/^\d+\./.test(line.trim())) {
          return line.replace(/^\d+\. (.+)$/g, '<li class="ml-4 list-decimal">$1</li>');
        }
        return line;
      });
      
      const listType = paragraph.trim().startsWith('-') ? 'ul' : 'ol';
      return `<${listType} class="my-3">${listItems.join('')}</${listType}>`;
    }
    
    // Regular paragraph
    return `<p class="my-2">${paragraph
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')}</p>`;
  });
  
  return processedParagraphs.join('');
};