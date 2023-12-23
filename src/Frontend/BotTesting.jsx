import React, { useState, useContext }  from 'react'
import ReactDOMServer from 'react-dom/server';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useParams } from 'react-router-dom';
import Mybot from '../ReusableComponents/Mybotbckend';
import './BotTesting.css';
import ConfettiExplosion from 'react-confetti-explosion';

function BotTesting({ userId }) {
  const navigate = useNavigate();
  const { AssistantId } = useParams();
  const userAssitant = AssistantId;
  console.log(userAssitant);
  
  const context = useContext(UserContext);
  const [showOverlay, setShowOverlay] = useState(true);
  const [embedCode, setEmbedCode] = useState(null);

  const handleGotItClick = () => {
    setShowOverlay(false);
  };

  const moveToDashboard = () => {
    
    navigate('/BotDashboardWithUsers' );
  };
   

  

  const generateEmbedCode = () => {
    
    return `//Insert this div in whichever pages you want your bot on

    <div class="Api-chat-widget" data-symbol=${userAssitant}></div>
    
    //Insert this CSS file above any existing stylesheets in the head tag
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/RiktheDegen/MyBot@main/MyBot/dist/assets/index.css">
    
    //Insert this in the bottom of any html page 
    
    <script type="module" src="https://cdn.jsdelivr.net/gh/RiktheDegen/Myfinnewbot@master/dist/assets/index-hgqPCg92.js"></script>`;
  };

  const handleGenerateEmbedClick = () => {
    console.log('1');
    const code = generateEmbedCode();
    console.log('2');
    setEmbedCode(code);
  };


    // if ( !context.user?.uid )  {
    //     return <Navigate to = "/"/>
    //    }
  return (
    <div>
      {embedCode && (
        
        <div className='mx-4 mt-8'>
          <h3>Embed Code:</h3>
          <SyntaxHighlighter language="javascript" style={dracula}>
          {embedCode}
      </SyntaxHighlighter>
          
          
        </div>
      )};
     <button className='mx-4 mt-8 mb-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700' onClick={handleGenerateEmbedClick} style = {{backgroundColor: "#2D3748"}}>Generate embed</button>
     <button className='mx-4 mt-8 mb-8 border border-gray-500 text-gray-500 px-4 py-2 rounded hover:border-blue-500 hover:text-blue-500'  onClick={moveToDashboard}>
  Save Bot
</button>



    <Mybot AssistantId={AssistantId} />

      {/* Overlay */}
      {showOverlay && (
        <div className="overlay">
          
          <div className="overlay-content">
            <div className='flex'>
            
            <h2>
              
              Congratulations, your GPT Bot is ready</h2>
              
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class=" mx-2 w-10 h-10">
  <path d="M15 1.784l-.796.796a1.125 1.125 0 101.591 0L15 1.784zM12 1.784l-.796.796a1.125 1.125 0 101.591 0L12 1.784zM9 1.784l-.796.796a1.125 1.125 0 101.591 0L9 1.784zM9.75 7.547c.498-.02.998-.035 1.5-.042V6.75a.75.75 0 011.5 0v.755c.502.007 1.002.021 1.5.042V6.75a.75.75 0 011.5 0v.88l.307.022c1.55.117 2.693 1.427 2.693 2.946v1.018a62.182 62.182 0 00-13.5 0v-1.018c0-1.519 1.143-2.829 2.693-2.946l.307-.022v-.88a.75.75 0 011.5 0v.797zM12 12.75c-2.472 0-4.9.184-7.274.54-1.454.217-2.476 1.482-2.476 2.916v.384a4.104 4.104 0 012.585.364 2.605 2.605 0 002.33 0 4.104 4.104 0 013.67 0 2.605 2.605 0 002.33 0 4.104 4.104 0 013.67 0 2.605 2.605 0 002.33 0 4.104 4.104 0 012.585-.364v-.384c0-1.434-1.022-2.7-2.476-2.917A49.138 49.138 0 0012 12.75zM21.75 18.131a2.604 2.604 0 00-1.915.165 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-2.33 0 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-2.33 0 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-1.915-.165v2.494c0 1.036.84 1.875 1.875 1.875h15.75c1.035 0 1.875-.84 1.875-1.875v-2.494z" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class=" mx-2 w-10 h-10">
  <path d="M15 1.784l-.796.796a1.125 1.125 0 101.591 0L15 1.784zM12 1.784l-.796.796a1.125 1.125 0 101.591 0L12 1.784zM9 1.784l-.796.796a1.125 1.125 0 101.591 0L9 1.784zM9.75 7.547c.498-.02.998-.035 1.5-.042V6.75a.75.75 0 011.5 0v.755c.502.007 1.002.021 1.5.042V6.75a.75.75 0 011.5 0v.88l.307.022c1.55.117 2.693 1.427 2.693 2.946v1.018a62.182 62.182 0 00-13.5 0v-1.018c0-1.519 1.143-2.829 2.693-2.946l.307-.022v-.88a.75.75 0 011.5 0v.797zM12 12.75c-2.472 0-4.9.184-7.274.54-1.454.217-2.476 1.482-2.476 2.916v.384a4.104 4.104 0 012.585.364 2.605 2.605 0 002.33 0 4.104 4.104 0 013.67 0 2.605 2.605 0 002.33 0 4.104 4.104 0 013.67 0 2.605 2.605 0 002.33 0 4.104 4.104 0 012.585-.364v-.384c0-1.434-1.022-2.7-2.476-2.917A49.138 49.138 0 0012 12.75zM21.75 18.131a2.604 2.604 0 00-1.915.165 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-2.33 0 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-2.33 0 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-1.915-.165v2.494c0 1.036.84 1.875 1.875 1.875h15.75c1.035 0 1.875-.84 1.875-1.875v-2.494z" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class=" mx-2 w-10 h-10">
  <path d="M15 1.784l-.796.796a1.125 1.125 0 101.591 0L15 1.784zM12 1.784l-.796.796a1.125 1.125 0 101.591 0L12 1.784zM9 1.784l-.796.796a1.125 1.125 0 101.591 0L9 1.784zM9.75 7.547c.498-.02.998-.035 1.5-.042V6.75a.75.75 0 011.5 0v.755c.502.007 1.002.021 1.5.042V6.75a.75.75 0 011.5 0v.88l.307.022c1.55.117 2.693 1.427 2.693 2.946v1.018a62.182 62.182 0 00-13.5 0v-1.018c0-1.519 1.143-2.829 2.693-2.946l.307-.022v-.88a.75.75 0 011.5 0v.797zM12 12.75c-2.472 0-4.9.184-7.274.54-1.454.217-2.476 1.482-2.476 2.916v.384a4.104 4.104 0 012.585.364 2.605 2.605 0 002.33 0 4.104 4.104 0 013.67 0 2.605 2.605 0 002.33 0 4.104 4.104 0 013.67 0 2.605 2.605 0 002.33 0 4.104 4.104 0 012.585-.364v-.384c0-1.434-1.022-2.7-2.476-2.917A49.138 49.138 0 0012 12.75zM21.75 18.131a2.604 2.604 0 00-1.915.165 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-2.33 0 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-2.33 0 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-1.915-.165v2.494c0 1.036.84 1.875 1.875 1.875h15.75c1.035 0 1.875-.84 1.875-1.875v-2.494z" />
</svg>

            </div>
            <ConfettiExplosion />
            
            <p>
            At this stage you can test and customise your bot. Ask your bot any question your users might have. <br></br>
             When you're ready, click on generate embed to get it installed on your website today
            </p>
            <button onClick={handleGotItClick} >Okay, I got it</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BotTesting