import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Copy, Check } from 'lucide-react';

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';
  const [feedback, setFeedback] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showInteractions, setShowInteractions] = useState(false);

  // Try to parse the message content if it's in JSON format (for attachments)
  let parsedContent = message.content;
  let attachment = null;
  
  if (!isUser) {
    try {
      // Only try to parse user messages that might contain attachments
      if (typeof message.content === 'string' && message.content.startsWith('{')) {
        const parsed = JSON.parse(message.content);
        if (parsed.text !== undefined) {
          parsedContent = parsed.text;
          attachment = parsed.attachment;
        }
      }
    } catch (e) {
      // If parsing fails, use the original content
      parsedContent = message.content;
    }
  }

  // Function to format assistant messages with bullet points
  const formatAssistantMessage = (content) => {
    if (isUser) return content;

    // Split by new lines or periods followed by a space
    const parts = content.split(/(?:\n+|\. )/g);
    
    // Filter out empty parts and format with bullet points
    const formattedParts = parts
      .filter(part => part.trim().length > 0)
      .map((part, index) => {
        // Add period if it doesn't end with punctuation
        const formattedPart = part.trim();
        const needsPeriod = !formattedPart.match(/[.!?]$/) && formattedPart.length > 0;
        
        // Check if part starts with a header-like format (###)
        if (formattedPart.startsWith('###')) {
          return (
            <h3 key={index} className="font-bold text-md mt-3 mb-2">
              {formattedPart.replace(/^###\s*/, '')}
            </h3>
          );
        }
        
        // Check if part starts with a number followed by a period (like "1.")
        if (formattedPart.match(/^\d+\.\s/)) {
          return (
            <div key={index} className="mb-2 flex">
              <span className="font-bold mr-2">{formattedPart.match(/^\d+\.\s/)[0]}</span>
              <span>{formattedPart.replace(/^\d+\.\s/, '')}{needsPeriod ? '.' : ''}</span>
            </div>
          );
        }
        
        return (
          <li key={index} className="mb-2">
            {formattedPart}{needsPeriod ? '.' : ''}
          </li>
        );
      });

    return formattedParts.length > 1 ? (
      <ul className="list-disc pl-5 space-y-1">{formattedParts}</ul>
    ) : (
      <p>{content}</p>
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeedback = (type) => {
    setFeedback(type);
    // Here you could send feedback to your backend
    console.log(`User gave ${type} feedback for message:`, message.content);
  };

  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} fade-in slide-up`}
      onMouseEnter={() => !isUser && setShowInteractions(true)}
      onMouseLeave={() => !isUser && setShowInteractions(false)}
    >
      <div
        className={`max-w-[80%] p-4 rounded-lg shadow-sm ${
          isUser
            ? 'bg-gradient-to-r from-medical-gradient-start to-medical-gradient-end text-white rounded-br-none'
            : 'bg-medical-light text-medical-text rounded-bl-none'
        } transition-all duration-300 relative`}
      >
        {/* Attachment preview if exists */}
        {!isUser && attachment && attachment.preview && (
          <div className="mb-3">
            <img 
              src={attachment.preview} 
              alt={attachment.name || 'Attached image'} 
              className="rounded-lg max-w-full max-h-48 object-contain"
            />
          </div>
        )}
        
        <div className="text-sm">{formatAssistantMessage(parsedContent)}</div>
        
        {/* Interactive elements for assistant messages */}
        {!isUser && showInteractions && (
          <div className="absolute -bottom-8 right-0 flex items-center space-x-2 bg-white p-1 rounded-full shadow-md">
            <button 
              onClick={() => handleFeedback('thumbsUp')} 
              className={`p-1.5 rounded-full ${feedback === 'thumbsUp' ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'}`}
            >
              <ThumbsUp size={14} />
            </button>
            <button 
              onClick={() => handleFeedback('thumbsDown')} 
              className={`p-1.5 rounded-full ${feedback === 'thumbsDown' ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'}`}
            >
              <ThumbsDown size={14} />
            </button>
            <button 
              onClick={handleCopy} 
              className="p-1.5 rounded-full hover:bg-gray-100"
            >
              {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;