import React, { useState } from 'react';
import axios from 'axios';
import '../css/MoodChatBot.css';

function MoodChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY;
  const moodChips = ['Happy', 'Sad', 'Romantic', 'Excited', 'Scared', 'Bored'];

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const res = await axios.post(
        'https://api.cohere.ai/v1/generate',
        {
          model: 'command',
          prompt: `Suggest 3 movies for someone who is feeling "${input}". Only return the names.`,
          max_tokens: 60,
          temperature: 0.7,
          k: 0,
          stop_sequences: [],
          return_likelihoods: 'NONE',
        },
        {
          headers: {
            Authorization: `Bearer ${COHERE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const reply = res.data.generations[0].text.trim();
      setMessages([...newMessages, { sender: 'bot', text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { sender: 'bot', text: '⚠️ Error fetching response from Cohere!' },
      ]);
    }

    setIsTyping(false);
    setInput('');
  };

  return (
    <>
      {!isOpen && (
        <div className="chat-toggle-button" onClick={() => setIsOpen(true)}>
          💬
        </div>
      )}

      {isOpen && (
        <div className="chatbot-container">
          <div className="mood-header">
            <strong>MoodBot 🎬</strong>
            <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
          </div>

          <div className="mood-chips">
            {moodChips.map((mood) => (
              <button key={mood} className="mood-chip" onClick={() => setInput(mood)}>
                {mood}
              </button>
            ))}
          </div>

          <div className="chat-window">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="typing-indicator">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            )}
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your mood..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default MoodChatBot;
