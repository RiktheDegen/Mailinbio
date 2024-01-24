import React, { useState, useContext, useEffect }  from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';


function Integration() {
    const [embedCode, setEmbedCode] = useState(null);
    const [upgradeAlert, setUpgradeAlert] = useState(null);
    const navigate = useNavigate();

    const moveToDashboard = () => {
    
        navigate('/BotDashboardWithUsers' );
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
    
    const emailSubject = encodeURIComponent('Trouble Integrating Bot');
    const emailBody = encodeURIComponent('I need assistance with integrating the bot. Can you please help?');
  

    const mailtoLink = `mailto:teamdocmonster@gmail.com?subject=${emailSubject}&body=${emailBody}`;
  
  
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
    
   </>
  )
}

export default Integration