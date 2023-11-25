import React, { useState } from 'react';
import './Mybot.css';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';


//new comment to check if git is working 
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
    setMessages([...messages, userMessage, '']);
    setNewMessage('');
  
    try {
      const response = await axios.post('http://localhost:3001/api/messages', {
        text: newMessage,
      });
  
      const botResponse = response.data.botResponse?.text;
      console.log('Received API reply');
  
      if (botResponse !== undefined) {
        const formattedBotResponse = formatBotResponse(botResponse);
        const botMessage = { text: formattedBotResponse, type: 'bot' };
        console.log('Bot message:', botMessage);
  
        setMessages([...messages, userMessage, botMessage]);
        setNewMessage('');
      } else {
        console.error('Bot response is undefined.');
      }
    } catch (error) {
      console.error('Error fetching API:', error);
    }
  };

  const formatBotResponse = (botResponse) => {
    const paragraphs = botResponse.split('\n\n');
    const formattedParagraphs = paragraphs.map((paragraph, index) => {
      // Check for code blocks
      if (paragraph.startsWith('```') && paragraph.endsWith('```')) {
        return (
          <div key={index} className="code-block">
            <SyntaxHighlighter language="javascript" style={dracula}>
              {paragraph.slice(3, -3)}
            </SyntaxHighlighter>
          </div>
        );
      } else {
        // Apply bold formatting for ```...``` occurrences
        const parts = paragraph.split(/\`\`\`(.*?)\`\`\`/g);
        const formattedParts = parts.map((part, partIndex) => {
          if (partIndex % 2 === 1) {
            return <code key={partIndex} className="code-text">{part}</code>;
          }
          return part;
        });
  
        // Apply bold formatting for **...** occurrences
        const boldFormatted = formattedParts.map((formattedPart, partIndex) => {
          if (typeof formattedPart === 'string') {
            const boldParts = formattedPart.split(/\*\*(.*?)\*\*/g);
            return boldParts.map((boldPart, boldIndex) => {
              if (boldIndex % 2 === 1) {
                return <strong key={boldIndex} className="bold-text">{boldPart}</strong>;
              }
              return boldPart;
            });
          }
          return formattedPart;
        });
  
        return <p key={index}>{boldFormatted}</p>;
      }
    });
  
    return formattedParagraphs;
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
    <div key={index} className={msg.type === 'user' ? 'user-bubble' : 'bot-bubble'}>
      {msg.type === 'bot' ? (
        <div className="bot-response">{msg.text}</div>
      ) : (
        msg.text
      )}
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

