import React, { useState, useContext, useEffect }  from 'react'
import { getDatabase, ref, get } from 'firebase/database';
import ReactDOMServer from 'react-dom/server';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useParams } from 'react-router-dom';
import Mybot from '../ReusableComponents/Mybotbckend';
import './BotTesting.css';
import ConfettiExplosion from 'react-confetti-explosion';
import PricingPopup from './PricingPopup';
import { Helmet } from 'react-helmet';

function BotTesting({ userId }) {

  const emailSubject = encodeURIComponent('Trouble Integrating Bot');
  const emailBody = encodeURIComponent('I need assistance with integrating the bot. Can you please help?');

  const mailtoLink = `mailto:teamdocmonster@gmail.com?subject=${emailSubject}&body=${emailBody}`;


  const navigate = useNavigate();
  const { AssistantId } = useParams();
  const userAssitant = AssistantId;
  console.log(userAssitant);
  
  const [PricingModalIsOpen, setPricingModalIsOpen] = useState(false);
  const PricingOpenModal = () => setPricingModalIsOpen(true);
  const PricingCloseModal = () => setPricingModalIsOpen(false);

  const context = useContext(UserContext);
  const [showOverlay, setShowOverlay] = useState(true);
  const [embedCode, setEmbedCode] = useState(null);
  const [user, setUser] = useState(null);
  const [upgradeAlert, setUpgradeAlert] = useState(null);
  const [hasPaidStatus, setHasPaidStatus] = useState(null);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // Function to fetch the user's name
    const fetchUserName = async () => {
  
       // Dynamically create script tag and append it to the head
      
      
      const db = getDatabase();
      const userRef = ref(db, 'users/' + context.user.uid);
      const snapshot = await get(userRef);
      setUserData(snapshot.val());
      setHasPaidStatus(snapshot.val().HasPaidStatus);


    };

    fetchUserName();
  }, [context.user?.uid,  hasPaidStatus ]); 




  const handleGotItClick = () => {
   
    setShowOverlay(false);
  };

  const moveToDashboard = () => {
    
    navigate('/BotDashboardWithUsers' );
  };
   
  

  

  const generateEmbedCode = () => {
    
      return `//Insert this div in whichever pages you want your bot on

      <div class="Api-chat-widget" data-symbol="${userAssitant}" data-uid="${context.user.uid}"></div>
      
      //Insert this CSS file above any existing stylesheets in the head tag
      
      <link rel="stylesheet" href="https://myapiembedbot-9fe68cda24da.herokuapp.com/index-5zgJYuOQ.css">
      
      //Insert this in the bottom of any html page 
      
      <script type="module" src="https://myapiembedbot-9fe68cda24da.herokuapp.com/index-MeHTexxv.js"></script>`
    
   
   
  };

  const handleGenerateEmbedClick = () => {
    
    console.log('1');
    const code = generateEmbedCode();
    console.log('2');
    console.log(hasPaidStatus);
    if (hasPaidStatus === 'true') {
      console.log(context.user);
      setEmbedCode(code);
    }
    else {
     
      setUpgradeAlert(`Please choose a plan to view your embed` )
      console.log(upgradeAlert);
    }
    
  };

  const htmlCode = `<div class="Api-chat-widget" data-symbol="{your embed code}" data-uid="{your embed code}"></div>`;

  // CSS
  const cssCode = `<link rel="stylesheet" href="{your embed code}">`;

  // JS
  const jsCode = `<script type="module" src="{your embed code}"></script>`;

  // React Helmet
  const reactHelmetCode = `
import React from 'react';
import { Helmet } from 'react-helmet';

const YourComponent = () => (
  <div>
    <Helmet>
      <title>Your React App with Bot</title>
      {/* Include bot-related scripts and styles in the head */}
      ${jsCode}
      ${cssCode}
    </Helmet>
    {/* Your component content */}
    <div class="Api-chat-widget" data-symbol="{your embed code}" data-uid="{your embed code}"></div>
  </div>
);

export default YourComponent;
  `;
  return (
   <>
    <Helmet>

<script type="module" src="https://myapiembedbot-9fe68cda24da.herokuapp.com/index-MeHTexxv.js"></script>

    </Helmet>
  
   
   <div>

   <div className="my-8 text-helvetica-neue container">
      <h2 className="text-3xl font-bold mb-4">Testing your bot</h2>
      <p className="text-gray-600 font-medium">
        We recommend users ask their bot the following questions as a hygiene requirement:
      </p>
      <ul className="list-disc text-helvetica-neue font-medium  mt-4">
        <li>Question 1: What are my uploaded files about?</li>
        <li>Question 2: Are you able to access and understand all the documents?</li>
        <li>Question 3: Make a 4 line summary of each uploaded document</li>
       
      </ul>
      <p className="text-gray-600 text-helvetica-neue font-medium ">
        That's it! Feel free to ask any other questions you have to it 
      </p>
    </div>
     
    <div className="container my-8 text-helvetica-neue">
      <Helmet>
        <title>Bot Integration Guide</title>
      </Helmet>

      <h2 className="text-3xl font-bold mb-4">Bot Integration Guide</h2>
      <p>
        To integrate the bot into your webpage follow these steps:
      </p>

      <div className="my-8 text-helvetica-neue">
      {/* HTML */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2 ">1. Insert this div in your HTML in every page you want your bot to show up in:</h3>
        <pre className='bg-gray-800 p-4 rounded-md text-white'>
         
            {htmlCode}
        
        </pre>
      </div>

      {/* CSS */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">2. Insert this CSS file in your HTML (above existing stylesheets):</h3>
        <pre className='bg-gray-800 p-4 rounded-md text-white'>
       
            {cssCode}
        
        </pre>
      </div>

      {/* JS */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">3. Insert this script at the bottom of your HTML page:</h3>
        <pre className='bg-gray-800 p-4 rounded-md text-white'>
         
            {jsCode}
       
        </pre>
      </div>

      {/* React Helmet */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">4. Use React Helmet in your React component:</h3>
        <p>To integrate the bot into your React application using React Helmet, follow these steps:</p>
        <pre className='bg-gray-800 p-4 rounded-md text-white'>
       
            {reactHelmetCode}

        </pre>
      </div>
      <a href={mailtoLink} className='text-helvetica-neue font-semibold text-black  ' target="_blank" rel="noopener noreferrer">
      Having trouble integrating? Reach out for a free integration.
    </a>
  
    </div>
    </div>


  


      {embedCode && (
        
        <div className='container  mx-4 mt-8'>
          <h4 className='text-helvetica-neue font-medium'>Embed Code:</h4>
          <SyntaxHighlighter language="javascript" style={dracula}>
          {embedCode}
      </SyntaxHighlighter>
      
   
          
        </div>
      )}
         {upgradeAlert && (
      <div className="text-center justify-center ml-2 mt-4 text-helvetica-neue text-gray-600 mb-4">
        {upgradeAlert}
        <button  className="ml-2 py-2 px-4 rounded" style={{ backgroundColor: "#2D3748", color: "#FFFFFF" }} onClick={PricingOpenModal}>
          Upgrade now
        </button>
      </div>
    )}

<div className='container space-x-4'>
<button className=' mt-8 mb-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700' onClick={handleGenerateEmbedClick} style = {{backgroundColor: "#2D3748"}}>Generate embed</button>
     <button className='mt-8 mb-8 border border-gray-500 text-gray-500 px-4 py-2 rounded hover:border-blue-500 hover:text-blue-500'  onClick={moveToDashboard}>
  Save Bot
</button>
</div>
    

<PricingPopup isOpen={PricingModalIsOpen} onRequestClose={PricingCloseModal} />

 

    <div class="Api-chat-widget" data-symbol={AssistantId} data-uid={context.user?.uid}
    data-theme="dark"></div>






      {/* Overlay */}
      {showOverlay && (
        <div className="overlay">
          
          <div className="overlay-content px-4 ">
            <div className='flex mx-auto'>
            
            <h2 className='flex mx-auto px-2'>
              
              Congratulations, your GPT Bot is ready.
              
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class=" mx-2 w-10 h-10">
  <path d="M15 1.784l-.796.796a1.125 1.125 0 101.591 0L15 1.784zM12 1.784l-.796.796a1.125 1.125 0 101.591 0L12 1.784zM9 1.784l-.796.796a1.125 1.125 0 101.591 0L9 1.784zM9.75 7.547c.498-.02.998-.035 1.5-.042V6.75a.75.75 0 011.5 0v.755c.502.007 1.002.021 1.5.042V6.75a.75.75 0 011.5 0v.88l.307.022c1.55.117 2.693 1.427 2.693 2.946v1.018a62.182 62.182 0 00-13.5 0v-1.018c0-1.519 1.143-2.829 2.693-2.946l.307-.022v-.88a.75.75 0 011.5 0v.797zM12 12.75c-2.472 0-4.9.184-7.274.54-1.454.217-2.476 1.482-2.476 2.916v.384a4.104 4.104 0 012.585.364 2.605 2.605 0 002.33 0 4.104 4.104 0 013.67 0 2.605 2.605 0 002.33 0 4.104 4.104 0 013.67 0 2.605 2.605 0 002.33 0 4.104 4.104 0 012.585-.364v-.384c0-1.434-1.022-2.7-2.476-2.917A49.138 49.138 0 0012 12.75zM21.75 18.131a2.604 2.604 0 00-1.915.165 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-2.33 0 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-2.33 0 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-1.915-.165v2.494c0 1.036.84 1.875 1.875 1.875h15.75c1.035 0 1.875-.84 1.875-1.875v-2.494z" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class=" mx-2 w-10 h-10">
  <path d="M15 1.784l-.796.796a1.125 1.125 0 101.591 0L15 1.784zM12 1.784l-.796.796a1.125 1.125 0 101.591 0L12 1.784zM9 1.784l-.796.796a1.125 1.125 0 101.591 0L9 1.784zM9.75 7.547c.498-.02.998-.035 1.5-.042V6.75a.75.75 0 011.5 0v.755c.502.007 1.002.021 1.5.042V6.75a.75.75 0 011.5 0v.88l.307.022c1.55.117 2.693 1.427 2.693 2.946v1.018a62.182 62.182 0 00-13.5 0v-1.018c0-1.519 1.143-2.829 2.693-2.946l.307-.022v-.88a.75.75 0 011.5 0v.797zM12 12.75c-2.472 0-4.9.184-7.274.54-1.454.217-2.476 1.482-2.476 2.916v.384a4.104 4.104 0 012.585.364 2.605 2.605 0 002.33 0 4.104 4.104 0 013.67 0 2.605 2.605 0 002.33 0 4.104 4.104 0 013.67 0 2.605 2.605 0 002.33 0 4.104 4.104 0 012.585-.364v-.384c0-1.434-1.022-2.7-2.476-2.917A49.138 49.138 0 0012 12.75zM21.75 18.131a2.604 2.604 0 00-1.915.165 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-2.33 0 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-2.33 0 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-1.915-.165v2.494c0 1.036.84 1.875 1.875 1.875h15.75c1.035 0 1.875-.84 1.875-1.875v-2.494z" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class=" mx-2 w-10 h-10">
  <path d="M15 1.784l-.796.796a1.125 1.125 0 101.591 0L15 1.784zM12 1.784l-.796.796a1.125 1.125 0 101.591 0L12 1.784zM9 1.784l-.796.796a1.125 1.125 0 101.591 0L9 1.784zM9.75 7.547c.498-.02.998-.035 1.5-.042V6.75a.75.75 0 011.5 0v.755c.502.007 1.002.021 1.5.042V6.75a.75.75 0 011.5 0v.88l.307.022c1.55.117 2.693 1.427 2.693 2.946v1.018a62.182 62.182 0 00-13.5 0v-1.018c0-1.519 1.143-2.829 2.693-2.946l.307-.022v-.88a.75.75 0 011.5 0v.797zM12 12.75c-2.472 0-4.9.184-7.274.54-1.454.217-2.476 1.482-2.476 2.916v.384a4.104 4.104 0 012.585.364 2.605 2.605 0 002.33 0 4.104 4.104 0 013.67 0 2.605 2.605 0 002.33 0 4.104 4.104 0 013.67 0 2.605 2.605 0 002.33 0 4.104 4.104 0 012.585-.364v-.384c0-1.434-1.022-2.7-2.476-2.917A49.138 49.138 0 0012 12.75zM21.75 18.131a2.604 2.604 0 00-1.915.165 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-2.33 0 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-2.33 0 4.104 4.104 0 01-3.67 0 2.604 2.604 0 00-1.915-.165v2.494c0 1.036.84 1.875 1.875 1.875h15.75c1.035 0 1.875-.84 1.875-1.875v-2.494z" />
</svg>
</h2>
            </div>
            <ConfettiExplosion />
            
            <p>
             Please referesh your page to view your bot
            At this stage you can test and customise your bot. Ask your bot any question your users might have.<br></br> 
             When you're ready, click on generate embed to get it installed on your website today
            </p>
            <button onClick={handleGotItClick} >Okay, I got it</button>
          </div>
        </div>
      )}
    </div>
    </>
  )
}

export default BotTesting