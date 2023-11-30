import React from 'react';
import ReactDOM from 'react-dom';
import Mybot, { defaultConfig } from './Mybotbckend';

const ChatbotWidget = (config = {}) => {
  const mergedConfig = { ...defaultConfig, ...config };

  ReactDOM.render(
    <Mybot {...mergedConfig} />,
    document.getElementById('chatbot-container') // Replace with your container ID
  );
};

export default ChatbotWidget;
