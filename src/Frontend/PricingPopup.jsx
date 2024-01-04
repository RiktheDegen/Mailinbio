// BotModal.js
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { getDatabase,ref, set, get,child, update, increment } from 'firebase/database';
import Modal from 'react-modal';
import { UserContext } from '../context/UserContext'


Modal.setAppElement('#root'); // Set the root element for accessibility

const PricingPopup = ({ isOpen, onRequestClose }) => {

    const customStyles = {

    content: {
    height: '750px',
    width: '1200px',
    background: '#1F2937',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "8px",
    outline: "none",
        },

      };
      const customOverlayStyles = {
        content: {
            background: '#1F2937',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            },
    
          };

  const [botName, setBotName] = useState('');
  const navigate = useNavigate();
  


  return (
    <div>
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} overlayClassName="overlay">
        <section className="h-screen py-16 max-w-screen-lg " style={{background: '#1F2937', maxWidth:'100vw'}} >
<div className="container mx-auto text-center ">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#C2C2C2' }}>Choose Your Plan</h2>
        <p className="mb-2 text-xl" style={{ color: '#C2C2C2' }}>Apichat is free till you are ready to integrate it into your website</p>
        <div className="mt-8 flex justify-center items-center flex-wrap">
          {/* Pricing cards for Premium, Advanced, and Enterprise plans */}
          <div className="bg-white p-8 rounded-lg shadow-md mx-4 max-w-md mb-6">
            <h3 className="text-xl text-gray-600 font-bold mb-2">Premium</h3>
            <p className="text-3xl font-bold text-gray-800 mb-4">$99/month</p>
            {/* Gradient Line */}
            <div className="w-full border-b-2 border-gray-300 my-4"></div>
            {/* Features */}
            <div className="flex items-center justify-center text-gray-800 mb-4">
              <div className="flex items-center justify-center bg-green-500 text-white h-6 w-6 rounded-full mx-2">
                ✓
              </div>
              <p className="mb-2">Advanced Analytics</p>
            </div>
            <div className="flex items-center justify-center text-gray-800 mb-4">
              <div className="flex items-center justify-center bg-green-500 text-white h-6 w-6 rounded-full mx-2">
                ✓
              </div>
              <p className="mb-2">24/7 Customer Support</p>
            </div>
            <div className="flex items-center justify-center text-gray-800 mb-4">
              <div className="flex items-center justify-center bg-green-500 text-white h-6 w-6 rounded-full mx-2">
                ✓
              </div>
              <p className="mb-2">Custom Integrations</p>
            </div>
            {/* Buy Button */}
          

            <form action="https://lorem-ipsum-demo-3115728536ba.herokuapp.com/create-checkout-session-premium" method="POST">
              <button className="bg-green-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-400 transition duration-300" type="submit">
                Choose Plan
              </button>
            </form>
          </div>

          {/* Repeat the above structure for Advanced and Enterprise plans */}
          <div className="bg-white p-8 rounded-lg shadow-md mx-4 max-w-md mb-6">
            <h3 className="text-xl text-gray-600 font-bold mb-2">Advanced</h3>
            <p className="text-3xl font-bold text-gray-800 mb-4">$199/month</p>
            {/* Gradient Line */}
            <div className="w-full border-b-2 border-gray-300 my-4"></div>
            {/* Features */}
            <div className="flex items-center justify-center text-gray-800 mb-4">
              <div className="flex items-center justify-center bg-green-500 text-white h-6 w-6 rounded-full mx-2">
                ✓
              </div>
              <p className="mb-2">Advanced Analytics</p>
            </div>
            <div className="flex items-center justify-center text-gray-800 mb-4">
              <div className="flex items-center justify-center bg-green-500 text-white h-6 w-6 rounded-full mx-2">
                ✓
              </div>
              <p className="mb-2">24/7 Customer Support</p>
            </div>
            <div className="flex items-center justify-center text-gray-800 mb-4">
              <div className="flex items-center justify-center bg-green-500 text-white h-6 w-6 rounded-full mx-2">
                ✓
              </div>
              <p className="mb-2">Custom Integrations</p>
            </div>
            {/* Buy Button */}
           
         
            <form action="https://lorem-ipsum-demo-3115728536ba.herokuapp.com/create-checkout-session-advanced" method="POST">
              <button className="bg-green-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-400 transition duration-300" type="submit">
                Choose Plan
              </button>
            </form>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md mx-4 max-w-md mb-6">
            <h3 className="text-xl text-gray-600 font-bold mb-2">Enterprise</h3>
            <p className="text-3xl font-bold text-gray-800 mb-4">Let's Chat</p>
            {/* Gradient Line */}
            <div className="w-full border-b-2 border-gray-300 my-4"></div>
            {/* Features */}
            <div className="flex items-center justify-center text-gray-800 mb-4">
              <div className="flex items-center justify-center bg-green-500 text-white h-6 w-6 rounded-full mx-2">
                ✓
              </div>
              <p className="mb-2">Advanced Analytics</p>
            </div>
            <div className="flex items-center justify-center text-gray-800 mb-4">
              <div className="flex items-center justify-center bg-green-500 text-white h-6 w-6 rounded-full mx-2">
                ✓
              </div>
              <p className="mb-2">24/7 Customer Support</p>
            </div>
            <div className="flex items-center justify-center text-gray-800 mb-4">
              <div className="flex items-center justify-center bg-green-500 text-white h-6 w-6 rounded-full mx-2">
                ✓
              </div>
              <p className="mb-2">Custom Integrations</p>
            </div>
            {/* Buy Button */}
           
              <button className="bg-green-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-400 transition duration-300" type="disabled">
                Coming soon
              </button>
       
          </div>
          {/* You can copy and modify the above structure for the other plans */}
        </div>
      </div>
      </section>
</Modal>
    </div>
    
  );
};

export default PricingPopup;
