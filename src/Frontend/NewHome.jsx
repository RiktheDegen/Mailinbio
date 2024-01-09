import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom';
import './NewHome.css'
import axios from 'axios'
import HeroBanner from '../static/Group 22.png'
import sectionOne from '../static/Group 11.png'
import sectionTwo from '../static/Group 12.png'
import sectionThree from '../static/Frame 6.png'
import logo from '../static/icon (1).png'

function NewHome() {
    const [activeStep, setActiveStep] = useState(1);
    

    const targetRef = useRef(null);

    const scrollToSection = () => {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    

    useEffect(() => {
        const handleScroll = () => {
          // Calculate the offset for each step
          const stepOffsets = [0, /* Offset of step 1 */, /* Offset of step 2 */, /* Offset of step 3 */];
      
          // Determine the active step based on scroll position
          const scrollPosition = window.scrollY + window.innerHeight / 2; // Adjust for the center of the viewport
          for (let i = 1; i <= 3; i++) {
            if (scrollPosition < stepOffsets[i]) {
              setActiveStep(i);
              break;
            }
          }
        };
      
        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);
      
        return () => {
          // Detach the scroll event listener on component unmount
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

      function submitStripeForm() {
        // Gather form data or perform any necessary actions
  
        // Make an asynchronous POST request to your server using Axios
        axios.post('https://lorem-ipsum-demo-3115728536ba.herokuapp.com/create-checkout-session', {
          // Include your form data here
        })
        .then(response => {
          // Handle the response from the server
          console.log(response.data);
        })
        .catch(error => {
          // Handle errors
          console.error('There was a problem with the Axios request:', error);
        });
      }
    
      const [currentStep, setCurrentStep] = useState(1);

      const handleNextStep = () => {
        setCurrentStep((currentStep) => (currentStep < 3 ? currentStep + 1 : currentStep));
      };
    
      const handlePrevStep = () => {
        setCurrentStep((currentStep) => (currentStep > 1 ? currentStep - 1 : currentStep));
      };
    
      
    return (
    <>
    
    
     
    
    <section>
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 text-black ">
        <div className="p-8 md:p-16 max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center md:flex-row">
            <div className="md:w-1/2">
              <h1 className="text-helvetica-neue font-bold mb-8 text-5xl sm:text-6xl  md:text-6xl lg:text-6xl " style={{ color: "#1F2937"}}>
              Supercharge your API docs with AI chat
              </h1>
              <p className=" text-helvetica-neue mb-8 text-lg md:text-xl">
               Nobody loves reading API documentation. Help your customers understand, implement and debug your product faster than ever with docmonsterAI's chat assitant.
              </p>
              <div className="flex mx-auto   items-center md:items-center ">
    <div>
    <button className=" py-2 px-4 rounded-md "style={{ color: '#FFFFFF', backgroundColor: '#21C55D' }} ><Link to="/Signup" style={{  color: '#FFFFFF', textDecoration: 'none' }}>Get Started</Link></button>
    
    </div>
    <button className="border ml-4  border-black text-grey py-2 px-4 rounded-md" onClick={scrollToSection}>View Pricing</button>
   
  </div>
  <p className='mt-2 text-helvetica-neue font-semibold '>No credit card required</p>
            </div>
            <div className="mt-8 md:mt-0 md:w-1/2">
              <img
                className="rounded-lg"
                src={HeroBanner} // replace with your image path
                alt="Your Image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
   
    <div className=" pt-20 bg-gradient-to-r from-gray-100 to-gray-200  border-b-4  rounded-b-[30] ">
      <img className='max-w-[150px] md:mx-auto ' src={logo} />
    <h2  className="text-helvetica-neue text-5xl px-8 font-semibold md:text-left md:text-center">
    How DocMonster Works
    </h2>
    <p className="text-helvetica-neue mb-8 text-xl  mx-auto px-8 max-w-[750px] md:text-center" >Get started with DocMonster in three easy steps today. DocMonster is free to use till you're ready to integrate it onto your website</p>
  
  <div className="container text-helvetica-neue mt-8 mb-16">
    <div className="flex flex-col lg:flex-row flex-grow ">
      {/* Step 1 */}
      <div className="flex items-center justify-center flex-grow mt-4">
      <div className="flex-1 text-center items-center ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-12 h-12 mx-auto mb-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
</svg>

          <h2 className="text-lg font-bold mb-2">Upload docs</h2>
          <p className="text-gray-600 font-medium">Upload upto 20 files per agent </p>
        </div>
      </div>

      {/* Step 2 */}
      <div  className="flex items-center justify-center flex-grow mt-4 lg:mt-0 lg:ml-4">
      <div className="flex-1 text-center items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-12 h-12 mx-auto mb-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg>



          <h2 className="text-lg font-semibold mb-2">Test it</h2>
          <p className="text-gray-600 font-medium">Test your agent rigorously</p>
        </div>
      </div>

      {/* Step 3 */}
      <div  className="flex items-center justify-center flex-grow mt-4 lg:mt-0 lg:ml-4">
      <div className="flex-1 text-center items-center ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-12 h-12 mx-auto mb-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
</svg>

          <h2 className="text-lg font-semibold mb-2">Embed it</h2>
          <p className="text-gray-600 font-medium">Embed it with three lines of code</p>
        </div>
      </div>
    </div>
  </div>
  </div>

  

    <section className="mt-8 mb-8 flex flex-col md:flex-row bg-white p-8 md:p-16 max-w-[1200px] mx-auto ">
      {/* Text Section */}
      <div className="md:w-1/2 md:ml-4 mb-4">
        <p className="text-helvetica-neue text-md font-medium mb-4">
          Convert
        </p>
        <h2 className="text-helvetica-neue text-5xl font-medium mb-4">
          Use chat to convert more and reduce churn
        </h2>
        <p className="text-helvetica-neue mb-4">
          Developers can chat with your API docs before purchase to decide whether they want to convert. This increases conversions, NPS, and reduces churn.
        </p>
      </div>

      {/* Image Section */}
      <div className="md:ml-8">
        <img
          src={sectionOne}  // Replace with your image path
          alt="Description of the image"
          className="mx-auto max-w-[1/2vw] self-right"
        />
      </div>
    </section>    

    <section className="mt-8 mb-8 flex flex-col-reverse md:flex-row  bg-white p-8 md:p-16 max-w-[1200px] mx-auto">
  {/* Image Section */}
  <div className="md:w-1/2 md:max-w-[calc(100% - 2rem)] md:mr-4 mb-4">
    <img
      src={sectionTwo}  // Replace with your image path
      alt="Description of the image"
      className="mx-auto w-auto h-auto"
    />
  </div>

  {/* Text Section */}
  <div className="md:w-1/2 md:ml-8">
    <p className="text-helvetica-neue text-md font-medium mb-4">
      Retain
    </p>
    <h2 className="text-helvetica-neue text-5xl font-medium mb-4">
    Allow developers to integrate your api quickly
    </h2>
    <p className="text-helvetica-neue mb-4">
    Developers can ask your bot for custom code examples that can be used immediately in their product. This reduces the time to integrate and use your API by an order of magnitude 
    </p>
  </div>
</section>

<section className="mt-8 mb-8 flex flex-col md:flex-row bg-white p-8 md:p-16 max-w-[1200px] mx-auto ">
      {/* Text Section */}
      <div className="md:w-1/2 md:ml-4 mb-4">
        <p className="text-helvetica-neue text-md font-medium mb-4">
        Delight
        </p>
        <h2 className="text-helvetica-neue text-5xl font-medium mb-4">
        Let Users debug code & launch faster
        </h2>
        <p className="text-helvetica-neue mb-4">
        Developers can debug issues with your code directly on your platform - allowing them to code solve problems and push to production faster than ever before directly on your docs page        </p>
      </div>

      {/* Image Section */}
      <div className="md:ml-8">
        <img
          src={sectionThree}  // Replace with your image path
          alt="Description of the image"
          className="mx-auto max-w-[1/2vw] self-right"
        />
      </div>
    </section>    
 
    <section style={{ background: '#1F2937' }} className="pb-16 mt-8 ">
 
{/* Pricing Section */}
<section className="py-16 " style={{ background: '#1F2937' }} ref={targetRef}>
<div className="container mx-auto text-center">
        <h2 className="text-helvetica-neue text-3xl md:text-5xl font-semibold mb-4" style={{ color: '#C2C2C2' }}>DocMonster is free till you're ready to share your bot</h2>
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
          <Link to="/Signup">
              <button className="bg-green-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-400 transition duration-300" type="submit">
                Start for free
              </button>
              </Link>

            {/* <form action="https://lorem-ipsum-demo-3115728536ba.herokuapp.com/create-checkout-session-premium" method="POST">
              <button className="bg-green-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-400 transition duration-300" type="submit">
                Choose Plan
              </button>
            </form> */}
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
            <Link to="/Signup">
              <button className="bg-green-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-400 transition duration-300" type="submit" >
                Start for free
              </button></Link>
         
            {/* <form action="https://lorem-ipsum-demo-3115728536ba.herokuapp.com/create-checkout-session-advanced" method="POST">
              <button className="bg-green-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-400 transition duration-300" type="submit">
                Choose Plan
              </button>
            </form> */}
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
{/* Let's Get Started Section */}

<div className=" p-8 mt-8 items-center justify-center md:text-left md:text-center ">
  <h2 className="text-4xl font-medium mb-4 " style={{ color: '#C2C2C2' }}>Get Started Today</h2>
  <p className="text-gray-600 mb-4">Get started today and have a working agent with three simple steps</p>

  <div className="flex space-x-4 md:items-center justify-center">
    <button className=" py-2 px-4 rounded-md "style={{ color: '#FFFFFF', backgroundColor: '#21C55D' }} ><Link to="/Signup" style={{  color: '#FFFFFF', textDecoration: 'none' }}>Get Started</Link></button>
    
    <button className="border border-21C55D text-21C55D py-2 px-4 rounded-md" style={{ color: '#C2C2C2' }} onClick={scrollToSection}>View Pricing</button>
  </div>
</div>


</section>



</>

  );
}

export default NewHome