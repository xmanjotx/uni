"use client";

import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function DoctorChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input && !file) return;
    setLoading(true);
    const userMessage: Message = { role: 'user', content: input || (file ? file.name : '') };
    setMessages((prev) => [...prev, userMessage]);

    let fileContent = '';
    if (file) {
      if (file.type.startsWith('image/')) {
        fileContent = await toBase64(file);
      } else if (file.type === 'application/pdf' || file.type.startsWith('text/')) {
        fileContent = await file.text();
      }
    }

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-3a43fbd8e2084f5288e39ff997117679',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          ...messages,
          userMessage,
          ...(fileContent ? [{ role: 'user', content: `Analyze this medical report: ${fileContent}` }] : [])
        ],
        stream: false,
      }),
    });
    const data = await response.json();
    setMessages((prev) => [...prev, { role: 'assistant', content: data.choices?.[0]?.message?.content || 'No response.' }]);
    setInput('');
    setFile(null);
    setLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  function toBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  }

  return (
    <div className="uber-chat-outer">
      <div className="uber-chat-header">
        <span className="uber-chat-logo">🩺</span>
        <span className="uber-chat-title">Doctor Assistant</span>
      </div>
      <div className="uber-chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`uber-chat-bubble ${msg.role}`}>{msg.content}</div>
        ))}
        {loading && <div className="uber-chat-bubble assistant">AI is typing...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="uber-chat-input-row">
        <input
          type="text"
          placeholder="Ask a medical question..."
          value={input}
          onChange={e => setInput(e.target.value)}
          className="uber-chat-input"
          disabled={loading}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
        />
        <label className="uber-file-upload-btn">
          <input
            type="file"
            accept=".pdf,image/*,text/*"
            ref={fileInputRef}
            onChange={e => setFile(e.target.files?.[0] || null)}
            className="uber-file-input"
            disabled={loading}
          />
          <span>📎</span>
        </label>
        <button onClick={handleSend} disabled={loading || (!input && !file)} className="uber-send-btn">➤</button>
      </div>
    </div>
  );
}

// Add the following styles to globals.css for Uber-style, flat, creative chat UI
/*
.uber-chat-outer {
  max-width: 480px;
  margin: 40px auto;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 4px 32px 0 rgba(0,0,0,0.10);
  display: flex;
  flex-direction: column;
  height: 80vh;
  overflow: hidden;
}
.uber-chat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #e6f0fa;
  padding: 18px 24px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a2233;
  border-bottom: 1px solid #e0e0e0;
}
.uber-chat-logo {
  font-size: 2rem;
}
.uber-chat-title {
  font-family: 'Inter', 'Uber Move', Arial, sans-serif;
}
.uber-chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 24px 16px;
  background: #f7fbfd;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.uber-chat-bubble {
  max-width: 80%;
  padding: 14px 18px;
  border-radius: 18px;
  font-size: 1rem;
  line-height: 1.5;
  word-break: break-word;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
}
.uber-chat-bubble.user {
  align-self: flex-end;
  background: #d1f5e0;
  color: #1a2233;
  border-bottom-right-radius: 4px;
}
.uber-chat-bubble.assistant {
  align-self: flex-start;
  background: #e6f0fa;
  color: #1a2233;
  border-bottom-left-radius: 4px;
}
.uber-chat-input-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 16px;
  background: #fff;
  border-top: 1px solid #e0e0e0;
}
.uber-chat-input {
  flex: 1;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  font-size: 1rem;
  outline: none;
  background: #f7fbfd;
}
.uber-file-upload-btn {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1.3rem;
  background: #e6f0fa;
  border-radius: 8px;
  padding: 6px 10px;
  transition: background 0.2s;
}
.uber-file-upload-btn:hover {
  background: #d1f5e0;
}
.uber-file-input {
  display: none;
}
.uber-send-btn {
  background: #1a2233;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}
.uber-send-btn:disabled {
  background: #bfc9d1;
  cursor: not-allowed;
}
@media (max-width: 600px) {
  .uber-chat-outer {
    max-width: 100vw;
    height: 100vh;
    border-radius: 0;
    margin: 0;
  }
}
*/
