import { useState, useRef } from 'react';
import { Send, Paperclip, Camera, X, Image as ImageIcon } from 'lucide-react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const ChatInterface = ({ messages, isLoading, onSendMessage }) => {
  const [input, setInput] = useState('');
  const [showAttachOptions, setShowAttachOptions] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [attachPreview, setAttachPreview] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() || attachedFile) {
      // Create a message that includes both text and attachment info
      const message = {
        text: input.trim(),
        attachment: attachedFile ? {
          name: attachedFile.name,
          type: attachedFile.type,
          preview: attachPreview
        } : null
      };
      
      onSendMessage(JSON.stringify(message));
      setInput('');
      setAttachedFile(null);
      setAttachPreview(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedFile(file);
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setAttachPreview(e.target.result);
        reader.readAsDataURL(file);
      }
      
      setShowAttachOptions(false);
    }
  };

  const handleAttachClick = () => {
    setShowAttachOptions(!showAttachOptions);
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleCameraCapture = () => {
    cameraInputRef.current.click();
  };

  const removeAttachment = () => {
    setAttachedFile(null);
    setAttachPreview(null);
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message}
          />
        ))}
        {isLoading && <TypingIndicator />}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 relative">
        {attachedFile && (
          <div className="mb-2 p-2 bg-medical-light rounded-lg flex items-center">
            {attachPreview ? (
              <div className="relative w-16 h-16 mr-2">
                <img src={attachPreview} alt="Preview" className="w-full h-full object-cover rounded" />
                <button 
                  type="button" 
                  onClick={removeAttachment}
                  className="absolute -top-2 -right-2 bg-medical-blue text-white rounded-full p-1 shadow-md hover:bg-medical-dark-blue transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <ImageIcon size={20} className="mr-2 text-medical-blue" />
                <span className="text-sm truncate max-w-[200px]">{attachedFile.name}</span>
                <button 
                  type="button" 
                  onClick={removeAttachment}
                  className="ml-2 text-medical-blue hover:text-medical-dark-blue"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={handleAttachClick}
              className="p-3 text-medical-blue hover:text-medical-dark-blue transition-colors duration-200 flex items-center justify-center"
            >
              <Paperclip size={20} />
            </button>
            
            {showAttachOptions && (
              <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg p-2 flex flex-col space-y-2 w-48 border border-gray-100 z-10">
                <button
                  type="button"
                  onClick={handleFileUpload}
                  className="flex items-center p-2 hover:bg-medical-light rounded transition-colors"
                >
                  <ImageIcon size={18} className="mr-2 text-medical-blue" />
                  <span>Upload Image</span>
                </button>
                <button
                  type="button"
                  onClick={handleCameraCapture}
                  className="flex items-center p-2 hover:bg-medical-light rounded transition-colors"
                >
                  <Camera size={18} className="mr-2 text-medical-blue" />
                  <span>Take Photo</span>
                </button>
              </div>
            )}
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <input
              type="file"
              ref={cameraInputRef}
              onChange={handleFileChange}
              accept="image/*"
              capture="environment"
              className="hidden"
            />
          </div>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your health question..."
            className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-accent focus:border-transparent transition-all duration-200"
          />
          <button
            type="submit"
            className="p-3 bg-gradient-to-r from-medical-gradient-start to-medical-gradient-end text-white rounded-lg hover:shadow-md transition-all duration-200 flex items-center justify-center"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;