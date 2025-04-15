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
    <div className="doctor-fullscreen-chat">
      <header className="doctor-chat-header">
        <span className="doctor-chat-logo">🩺</span>
        <span className="doctor-chat-title">AI Doctor Assistant</span>
      </header>
      <main className="doctor-chat-main">
        <div className="doctor-chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`doctor-chat-bubble ${msg.role}`}>
              {msg.content}
            </div>
          ))}
          {loading && <div className="doctor-chat-bubble assistant">AI is typing...</div>}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <form className="doctor-chat-input-row" onSubmit={e => { e.preventDefault(); handleSend(); }}>
        <label className="doctor-file-upload-btn" title="Upload medical report">
          <input
            type="file"
            accept=".pdf,image/*,text/*"
            ref={fileInputRef}
            onChange={e => setFile(e.target.files?.[0] || null)}
            className="doctor-file-input"
            disabled={loading}
          />
          <span>📎</span>
        </label>
        <input
          type="text"
          placeholder="Ask a medical question..."
          value={input}
          onChange={e => setInput(e.target.value)}
          className="doctor-chat-input"
          disabled={loading}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
        />
        <button type="submit" disabled={loading || (!input && !file)} className="doctor-send-btn" aria-label="Send">
          <span>➤</span>
        </button>
      </form>
    </div>
  );
}
