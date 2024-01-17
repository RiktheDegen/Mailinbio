import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const SectionComponent = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const renderContent = () => {
    switch (selectedButton) {
      case 'sendgrid':
        return <div>Content for Sendgrid</div>;
      case 'stripe':
        return <div>Content for Stripe</div>;
      case 'hubspot':
        return <div>Content for Hubspot</div>;
      case 'brex':
        return <div>Content for Brex</div>;
      default:
        return <div>Select a service</div>;
    }
  };

  return (
    <>
    <Helmet>
<script type="module" src="https://myapiembedbot-9fe68cda24da.herokuapp.com/index-9Zc4VrRm.js"></script>
<link rel="stylesheet" href="https://myapiembedbot-9fe68cda24da.herokuapp.com/index-E-sZSRUH.css"></link>
    </Helmet>

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
