import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your AI Health Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const updatedMessages = [...messages, userMessage];

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-maverick:free',
          messages: [
            { role: 'system', content: 'You are a professional and empathetic healthcare doctor. Answer all questions accurately and responsibly.' },
            ...updatedMessages.map(msg => ({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.text }))
          ]
        })
      });

      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content || 'Sorry, I could not process that.';

      setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, something went wrong.' }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Ask your health question..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;