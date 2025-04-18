import React from 'react';

type MessageInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
};

export default function MessageInput({ value, onChange, onSend }: MessageInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask a medical question..."
        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button
        onClick={onSend}
        disabled={!value.trim()}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        Send
      </button>
    </div>
  );
}