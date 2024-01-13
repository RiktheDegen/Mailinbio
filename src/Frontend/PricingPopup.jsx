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
        <section className="h-screen py-16 max-w-screen-lg " style={{ maxWidth:'100vw'}} >
        <section className="py-16 ">
<div className="container mx-auto text-center">
        <h2 className="text-helvetica-neue text-3xl md:text-5xl font-semibold mb-4 mt-10" >DocMonster is free till you're ready to start</h2>
        <p className="mb-2 text-xl" >Get started today with simple pricing. Never pay for more than you use.</p>
        <div className="mt-8 flex justify-center items-center flex-wrap space-x-4">
          {/* Pricing cards for Premium, Advanced, and Enterprise plans */}
          
         
          
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md mb-6 flex-grow border-2 border-grey " >
          <h3 className="text-2xl font-bold justify-left">Basic</h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                <span className="text-4xl font-bold">$99</span>/ month
              </div>
            <div className="w-full border-b-2 border-gray-300 my-4"></div>
            {/* Features */}
            <div className="flex items-center justify-left text-gray-800 mb-2">
            
            <p className="flex mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

              1 chatbot</p>
          </div>
            <div className="flex items-center justify-left text-gray-800 mb-2">
             
              <p className="flex mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>
GPT-4 support</p>
            </div>
            <div className="flex items-center justify-left text-left text-gray-800 mb-2">
            
              <p className="flex mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

                Upto 1000 messages with GPT 4 
               </p>
            </div>
            <div className="flex items-center justify-left text-left text-gray-800 mb-2">
            
            <p className="flex mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

              Upto 5000 messages with GPT 3.5 turbo
             </p>
          </div>

            <div className="flex items-center justify-left text-gray-800 mb-2">
             
              <p className="flex mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

                Upto 20 files per bot</p>
            </div>

            <div className="flex items-center justify-left text-gray-800 mb-2">
             
             <p className="mb-2"></p>
           </div>
            {/* Buy Button */}
          <Link to="/Signup">
              <button className="border-2 border-black w-full text-black py-2 px-2 rounded-lg font-semibold  transition duration-300" type="submit">
                Choose plan
              </button>
              </Link>

         
          </div>

          {/* Repeat the above structure for Advanced and Enterprise plans */}
          <div className="bg-white p-8 rounded-lg shadow-md  border-2 border-black max-w-md mb-6 flex-grow">
          <h3 className="text-2xl font-bold text-center">Advanced</h3>
              <div className="mt-4 text-center dark:text-zinc-400">
                <span className="text-4xl text-black font-bold">$199</span>/ month
              </div>
            {/* Gradient Line */}
            <div className="w-full border-b-2 border-gray-300 my-4"></div>
            {/* Features */}
            <div className="flex items-center text-left justify-lefttext-gray-800 mb-2">
            
            <p className="flex mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

              1 chatbot</p>
          </div>
            <div className="flex items-center justify-left text-left text-gray-800 mb-2">
             
              <p className="flex mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>
GPT-4 support</p>
            </div>
            <div className="flex items-center justify-left text-left text-gray-800 mb-2">
            
              <p className="flex mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

                Upto 2500 messages with GPT 4 
               </p>
            </div>
            <div className="flex items-center justify-left text-left text-gray-800 mb-2">
            
            <p className="flex mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

              Upto 10000 messages with GPT 3.5 turbo
             </p>
          </div>
            <div className="flex items-center justify-left text-gray-800 mb-2">
             
              <p className="flex mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

                Upto 20 files per bot</p>
            </div>

            <div className="flex items-center justify-left text-gray-800 mb-2">
             
             <p className="mb-2"></p>
           </div>
            {/* Buy Button */}
            <Link to="/Signup">
              <button className="bg-green-500  w-full text-white py-2 px-2 rounded-lg font-semibold hover:bg-green-400 transition duration-300" type="submit" >
              Choose plan
              </button></Link>
         
            {/* <form action="https://lorem-ipsum-demo-3115728536ba.herokuapp.com/create-checkout-session-advanced" method="POST">
              <button className="bg-green-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-400 transition duration-300" type="submit">
                Choose Plan
              </button>
            </form> */}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md max-w-md mb-6 flex-grow border-2 border-grey">
          <h3 className="text-2xl font-bold text-center">Enterprise</h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                <span className="text-4xl font-bold">Let's chat</span>
              </div>
            {/* Gradient Line */}
            <div className="w-full border-b-2 border-gray-300 my-4"></div>
            {/* Features */}
            <div className="flex items-center justify-lefttext-gray-800 mb-2">
            
            <p className="flex mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

             Unlimited chatbots</p>
          </div>
            <div className="flex items-center justify-left text-left text-gray-800 mb-2">
             
              <p className="flex mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>
GPT-4 and custom models</p>
            </div>
            <div className="flex items-center justify-left text-left text-gray-800 mb-2">
            
              <p className="flex mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

                unlimited messages on any model</p>
            </div>
            <div className="flex items-center justify-left text-left text-gray-800 mb-2">
             
              <p className="flex mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

                Unlimited files uploads</p>
            </div>
            <div className="flex items-center justify-left text-gray-800 mb-2">
             
              <p className="flex mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

                Fine tuned models</p>
            </div>

            <div className="flex items-center justify-left text-gray-800 mb-2">
             
             <p className="mb-2"></p>
           </div>
            {/* Buy Button */}
           
              <button className="border-2 border-black w-full text-black py-2 px-2 rounded-lg font-semibold hover:bg-green-400 transition duration-300" type="disabled">
                Contact Us
              </button>
       
          </div>
          {/* You can copy and modify the above structure for the other plans */}
        </div>
      </div>
      </section>
      </section>
</Modal>
    </div>
    
  );
};

export default PricingPopup;
