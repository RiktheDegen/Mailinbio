import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Mybot from './Mybotbckend';

const EmbeddableChatbot = ({ UserId, AssistantId }) => {
  const chatbotHtml = ReactDOMServer.renderToString(<Mybot UserId={UserId} AssistantId={AssistantId} />);
  return (
    <div dangerouslySetInnerHTML={{ __html: chatbotHtml }} />
  );
};

export default EmbeddableChatbot;