import React, { useState, useRef, useEffect } from 'react';
import './Mybot.css';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useParams } from 'react-router-dom';

export const defaultConfig = {
  title: 'ChatGPT',
  theme: 'gray', // Add more configuration options as needed
};


//new comment to check if git is working 
const Mybot = ({ UserId, AssistantId, title, theme}) => {

  
  const userAssitant = AssistantId;
  

  const [collapsed, setCollapsed] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;
  
    const userMessage = { text: newMessage, type: 'user' };
    setMessages([...messages, userMessage, { text: '', type: 'bot', loading: true }]);
    setNewMessage('');
  
    try {
      const response = await axios.post('https://lorem-ipsum-demo-3115728536ba.herokuapp.com/api/messages', {
        text: newMessage,
        assistant: userAssitant,
      });
  
      const botResponse = response.data.botResponse?.text;
      console.log('Received API reply');
  
      if (botResponse !== undefined) {
        const formattedBotResponse = formatBotResponse(botResponse);
        const botMessage = { text: formattedBotResponse, type: 'bot', loading: false };
        console.log('Bot message:', botMessage);
  
        setMessages((prevMessages) => [...prevMessages.slice(0, -1), botMessage]);
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
    <div>
    <div
      className={`fixed bottom-0 right-0 m-4 p-4 bg-gray-800 text-gray-300 rounded-lg  ${
        collapsed ? 'w-60 collapsed' : 'partially-expanded'
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        {/* Header with collapse button */}
        <div className="flex text-lg text-helvetica-neue font-semibold  text-gray-300 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
</svg>
        <div className='ml-2 '>Docs AI</div>
          
          
          </div>
        <button onClick={toggleCollapse}>{collapsed ? '+' : '-'}</button>
      </div>

      {!collapsed && (
        <>
          {/* Chat history with scrollbar */}

          <div class="flex  bg-grey-300  p-2 rounded-md" style={{backgroundColor: "#2D3748"}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
</svg>
        <div className='ml-2'>
  <p className='mb-0 mx-auto text-helvetica-neue font-regular text-xs' style={{ Color: "#8C8C8C"}}>These answers are generated using artificial intelligence. This is an experimental technology, and information may occasionally be incorrect or misleading.
</p>
  </div>
</div>

          <div className="h-80 mb-4 overflow-y-auto mt-4" ref={chatContainerRef}>
  {messages.map((msg, index) => (
    <div key={index} className={msg.type === 'user' ? 'user-bubble' : 'bot-bubble'}>
      {msg.type === 'bot' ? (
          <div className="bot-response">
         <div className={msg.loading ? '' : 'typewriter-word'}>
  {Array.from(msg.text).map((char, index) => (
    <span key={index} >{char}</span>
  ))}
</div>

          {msg.loading && <div className="loading-indicator"></div>}
        </div>

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
              className="flex-grow p-2 mr-2 bg-gray-700  rounded-md outline" 
              style={{backgroundColor: "#1F2937", outlineColor: "#494A54"}}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            
            <button
              className="p-2  text-white rounded-md"
              style={{backgroundColor: "#494A54"}}
              onClick={handleSendMessage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" style={{color: "#1F2937"}}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
</svg>

            </button>
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default Mybot;

