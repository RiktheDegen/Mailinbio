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
     
         default:
       return ( <div className='item-center'>
       <img className='max-w-[200px] mx-auto' src='https://easysendy.com/wp-content/uploads/2016/08/SendGrid-Logo-1.png' alt='SendGrid Logo' />
      <p className='mx-auto text-center mt-2 text-helvetica-neue font-semibold'>
          Click '+' to get started</p>
       <Mybot AssistantId='asst_4GpPPYxJ7E8djfCNTxyPsxhh' UserId ='EzqjBlenACZH9TWxd1mK1sEAEg92'/></div>);
    }
  };

  return (
    <>
  

    <div className="flex flex-col items-center mt-4">
    
      {/* Content below the rounded box */}
      <div className="p-4 bg-white rounded-b-lg ">
        {renderContent()}
      </div>
    </div>
    </>
  );
};

export default SectionComponent;
