import React, { useState } from 'react';
import './Mybot.css';
import axios from 'axios';

const Mybot = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;
      const userMessage = { text: newMessage, type: 'user' };
      setMessages([...messages, userMessage,'']);
      setNewMessage('');
    
   
      const response = await axios.post('http://localhost:3001/api/messages', {
        text: newMessage,
      });

      const botResponse = response.data.botResponse?.text;
      console.log('Received API reply');
      if (botResponse !== undefined) {
        const botMessage = { text: botResponse, type: 'bot' };
        console.log('Bot message:', botMessage);
    
        setMessages([...messages, userMessage, botMessage]);
        setNewMessage('');
      } else {
        console.error('Bot response is undefined.');
      }

      
      setNewMessage('');
    
    };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div
      className={`fixed bottom-0 right-0 m-4 p-4 bg-gray-800 text-gray-300 rounded-lg ${
        collapsed ? 'w-60' : 'partially-expanded'
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        {/* Header with collapse button */}
        <div className="text-lg font-bold text-gray-300">ChatGPT</div>
        <button onClick={toggleCollapse}>{collapsed ? '+' : '-'}</button>
      </div>

      {!collapsed && (
        <>
          {/* Chat history with scrollbar */}
          <div className="h-80 mb-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.type === 'user' ? 'user-bubble' : 'bot-bubble'}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Chat input bar with send button */}
          <div className="flex">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-grow p-2 mr-2 bg-gray-700 text-gray-300 rounded-md"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="p-2 bg-green-500 text-white rounded-md"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Mybot;
