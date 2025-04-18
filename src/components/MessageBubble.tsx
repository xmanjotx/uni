import React from 'react';

type MessageBubbleProps = {
  sender: 'user' | 'ai';
  content: string;
};

export default function MessageBubble({ sender, content }: MessageBubbleProps) {
  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
      <div 
        className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${sender === 'user' 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-200 text-gray-800'}`}
      >
        {content}
      </div>
    </div>
  );
}