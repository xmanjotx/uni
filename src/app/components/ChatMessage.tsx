import { Message } from '../types';

export default function ChatMessage({ message }: { message: Message }) {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] rounded-lg p-4 ${
        message.role === 'user' 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-100 text-gray-900'
      }`}>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
