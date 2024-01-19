import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Mybot from '../ReusableComponents/Mybotbckend';
import SendGrid from '../static/SendGrid.png'

const SectionComponent = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const renderContent = () => {
    switch (selectedButton) {
      case 'sendgrid':
        return( <div className='item-center'>
          <img className='max-w-[200px] mx-auto' src='https://easysendy.com/wp-content/uploads/2016/08/SendGrid-Logo-1.png' alt='SendGrid Logo' />
         <p className='mx-auto text-center mt-2 text-helvetica-neue font-semibold'>
             Click '+' to get started</p>
          <Mybot AssistantId='asst_b8Hw9jjOigy3qGGcfIaWXUys' UserId ='EzqjBlenACZH9TWxd1mK1sEAEg92'/></div>);
      case 'stripe':
        return <div className='item-center'>
                <p className='mx-auto text-center text-helvetica-neue font-semibold'>Stripe</p>
          <Mybot /></div>;
      case 'hubspot':
        return <div className='item-center'>
           <p className='mx-auto text-center text-helvetica-neue font-semibold'>HubSpot</p>
          <Mybot /></div>;
      case 'brex':
        return <div className='item-center'>
           <p className='mx-auto text-center text-helvetica-neue font-semibold'>Brex</p>
          <Mybot /></div>;
         default:
       return ( <div className='item-center'>
       <img className='max-w-[200px] mx-auto' src='https://easysendy.com/wp-content/uploads/2016/08/SendGrid-Logo-1.png' alt='SendGrid Logo' />
      <p className='mx-auto text-center mt-2 text-helvetica-neue font-semibold'>
          Click '+' to get started</p>
       <Mybot AssistantId='asst_b8Hw9jjOigy3qGGcfIaWXUys' UserId ='EzqjBlenACZH9TWxd1mK1sEAEg92'/></div>);
    }
  };

  return (
    <>
  

    <div className="flex flex-col items-center mt-10">
      <div className="rounded-full border border-black p-2 ">
        {/* Rounded box with buttons */}
        <div className="flex justify-around">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleButtonClick('sendgrid')}
            className={`bg-white rounded-full p-2 ${selectedButton === 'sendgrid' && 'bg-gray-300'}`}
          >
            Sendgrid
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleButtonClick('stripe')}
            className={`bg-white rounded-full p-2 ${selectedButton === 'stripe' && 'bg-gray-300'}`}
          >
            Stripe
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleButtonClick('hubspot')}
            className={`bg-white rounded-full p-2 ${selectedButton === 'hubspot' && 'bg-gray-300'}`}
          >
            Hubspot
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleButtonClick('brex')}
            className={`bg-white rounded-full p-2 ${selectedButton === 'brex' && 'bg-gray-300'}`}
          >
            Brex
          </motion.button>
        </div>
      </div>

      {/* Content below the rounded box */}
      <div className="mt-4 p-4 bg-white rounded-b-lg ">
        {renderContent()}
      </div>
    </div>
    </>
  );
};

export default SectionComponent;
