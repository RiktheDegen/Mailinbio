import React, { useState, useEffect } from 'react';
import './Mybot.css';
import OpenAI from "openai";
import axios from 'axios';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs'; 

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});





const Mybot = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isThreadCreated, setIsThreadCreated] = useState(false); // New state
  const [globalThread, setGlobalThread] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const initThread = async () => {
      try {
        const thread = await createThread();
        console.log('Thread created:', thread.id);
        setGlobalThread(thread);
        setIsThreadCreated(true);
      } catch (error) {
        console.error('An error occurred during page load:', error);
      }
    };

    initThread();
  }, []);

  async function createThread() {
    try {
      const thread = await openai.beta.threads.create();
      return thread;
    } catch (error) {
      console.error('Error creating thread:', error);
      throw error;
    }
  }
  

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  
    if (!collapsed) {
      setExpanded(false); // If collapsing, reset the expanded state
    }
  };
  
  const toggleExpand = () => {
    setExpanded(true);
  
    if (expanded) {
      setCollapsed(false); // If expanding, reset the collapsed state
    }
  };
  
 
  const handleSendMessage = async () => {
    if (!isThreadCreated) return; // Disable sending messages if the thread is not created
  if (!globalThread) return; // Ensure globalThread is not undefined
    console.log(globalThread);
    if (newMessage.trim() === '') return;
    
    
      const userMessage = { text: newMessage, type: 'user' };
      setMessages([...messages, userMessage]);
      setNewMessage('');
    
    const sentMessage = await openai.beta.threads.messages.create(globalThread.id, {
      role: "user",
      content: userMessage.text,
    });

    const run = await openai.beta.threads.runs.create(globalThread.id, {
      assistant_id: 'asst_M2KsX8ZbPvYqla6uF7tkKEqH',
      instructions: "Address the user as developer"
    });

    let retryCount = 0;
    let success = false;
    let runStatus;
    let messageOutput;
    

    while (retryCount < 10) {
      runStatus = await openai.beta.threads.runs.retrieve(globalThread.id, run.id);
        console.log(runStatus);
      if (runStatus.status === 'completed') {
        success = true;
        messageOutput = await openai.beta.threads.messages.list(globalThread.id);
        console.log(messageOutput);
        break;
      } else if (runStatus.status === 'failed') {
        break;
      } else if (runStatus.status === 'queued' ||runStatus.status === 'in_progress' ) {
        // Wait for 50ms before checking again
        await new Promise(resolve => setTimeout(resolve, 10000));
      }

      retryCount++;
    }
    
    const lastElement = messageOutput.body.data;
    const botMessage = lastElement.find(lastElement => lastElement.role === 'assistant');
    const botReply = botMessage ? botMessage.content[0].text.value : null;

    const botResponse = {
      text: success ? botReply : 'the API call has failed',
      type: 'bot',
    };

    setMessages([...messages, userMessage, botResponse]);
    setNewMessage('');
    
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const formatMessage = (text, type) => {
    const paragraphs = text.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('```') && paragraph.endsWith('```')) {
        // Treat as a code block
        const codeContent = paragraph.substring(3, paragraph.length - 3);
        return (
          <SyntaxHighlighter key={index} language="javascript" style={dracula}>
            {codeContent}
          </SyntaxHighlighter>
        );
      } else {
        // Regular paragraph
        return <p key={index} className={type === 'user' ? 'user-text' : 'bot-text'}>{paragraph}</p>;
      }
    });

    return paragraphs;
  };
 


  return (
    <div className={`fixed bottom-0 right-0 m-4 p-4 bg-gray-800 text-gray-300 rounded-lg ${expanded ? 'expanded' : collapsed ? '' : 'partially-expanded'}`}>
    <div className="flex justify-between items-center mb-4" onClick={toggleCollapse}>
      <div className="text-lg font-bold text-gray-300">ChatGPT</div>
      <span className="collapse-expand-btn">{collapsed ? '+' : '↗️'}</span>
    </div>
  
    {!collapsed && (
      <>
        <div className="h-80 mb-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={msg.type === 'user' ? 'user-bubble' : 'bot-bubble'}>
              {formatMessage(msg.text, msg.type)}
            </div>
          ))}
        </div>
  
        <div className={`fixed bottom-0 right-0 m-4 p-4 bg-gray-800 text-gray-300 rounded-lg ${expanded ? 'expanded' : collapsed ? '' : 'partially-expanded'}`}>
    <div className="flex justify-between items-center mb-4" onClick={toggleCollapse}>
      <div className="text-lg font-bold text-gray-300">ChatGPT</div>
      <span className="collapse-expand-btn">{collapsed ? '+' : '↗️'}</span>
    </div>

    {!collapsed && (
      <>
        <div className="h-80 mb-4  overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={msg.type === 'user' ? 'user-bubble' : 'bot-bubble'}>
              {formatMessage(msg.text, msg.type)}
            </div>
          ))}
        </div>

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
      </>
    )}
  </div>
  
  
  );
};

export default Mybot;
