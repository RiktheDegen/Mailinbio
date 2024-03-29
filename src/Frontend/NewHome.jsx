import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom';
import './NewHome.css'
import axios from 'axios'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import HeroBanner from '../static/Group 22.png'
import sectionOne from '../static/Group 38.png'
import sectionTwo from '../static/frame6.gif' 
import sectionThree from '../static/frame7.gif'
import sectionFour from '../static/Group 32.png'
import sectionFive from '../static/group 30.gif'
import logo from '../static/icon (1).png'
import upload from '../static/Group 24.svg'
import SectionComponent from './SectionComponent';
import { Helmet } from 'react-helmet';
import { Card }  from 'reactstrap'



const CardsSection = () => {

 

  const cardsData = [
    { title: 'Upload Docs', content: 'Upload upto 20 files per agent', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mx-auto mb-4">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
  </svg> },
    { title: 'Test it', content: 'Test your AI agent rigorously', icon:  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mx-auto mb-4">
    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
  </svg>
   },
    { title: 'Embed it', content: 'Embed it with three lines of code', icon:  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mx-auto mb-4">
    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
   },
  ];

  return (
    <div className="flex overflow-x-auto space-x-4 p-4  md:justify-center space-x-8 lg:justify-center space-x-8 ">
      {cardsData.map((card, index) => (
        <div key={index} className="mb-8  p-4 rounded-4 flex-shrink-0 w-128">
          <div className="text-helvetica-neue mb-4">{card.icon}</div>
          <h2 className="text-lg font-bold mb-2 mb-2 text-center">{card.title}</h2>
          <p>{card.content}</p>
        </div>
      ))}
    </div>
  );
};


function NewHome() {



    const targetRef = useRef(null);

    const scrollToSection = () => {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const [answersVisible, setAnswersVisible] = useState({
      answer1: false,
      answer2: false,
      answer3: false,
      answer4: false,
      answer5: false,
      answer6: false,
    });
  
    const toggleAnswer = (questionId) => {
      setAnswersVisible((prev) => ({
        ...prev,
        [questionId]: !prev[questionId],
      }));
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
  
      <div className="text-black ">
        <div className="p-8 md:p-16 max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center md:flex-row">
            <div className="md:w-1/2">
              <h1 className="text-helvetica-neue font-bold mb-8 text-5xl sm:text-6xl  md:text-6xl lg:text-6xl " style={{ color: "#1F2937"}}>
              Supercharge your API docs with AI chat
              </h1>
              <p className=" text-helvetica-neue mb-8 text-lg md:text-xl">
               Nobody loves reading API documentation. Help your customers understand, implement and debug your product faster than ever with docmonster's chat assistant.
              </p>
              <div className="flex mx-auto   items-center md:items-center ">
    <div>
    <button className=" py-2 px-4 rounded-md "style={{ color: '#FFFFFF', backgroundColor: '#21C55D' }} ><Link to="/Signup" style={{  color: '#FFFFFF', textDecoration: 'none' }}>Get Started</Link></button>
    
    </div>
    <button className="border ml-4  border-black text-grey py-2 px-4 rounded-md"> <YouTubeLightboxButton/></button>
   
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
    <div className=" pt-20  rounded-b-[30] ">
      {/* <img className='max-w-[150px] md:mx-auto ' src={logo} /> */}
    <h2  className="text-helvetica-neue text-5xl px-8 font-semibold md:text-left md:text-center">
    How DocMonster Works
    </h2>
    <div className="flex justify-center items-center rounded-2 mt-4 mb-4 ">

    </div>
    <p className="text-helvetica-neue text-md font-medium mb-4 mx-auto px-8 max-w-[750px] md:text-center" >Get started with DocMonster in three easy steps today. DocMonster is free to use till you're ready to integrate it onto your website</p>
 
   < CardsSection/>
 
 
  </div>
  
 

  

    
    
  
      

  <section className="mt-8 mb-8 flex flex-col md:flex-row bg-white p-8 md:p-16 max-w-[1200px] mx-auto ">
      {/* Text Section */}
      <div className="md:w-1/2 md:ml-4 mb-4">
        <p className="text-helvetica-neue text-md font-medium mb-4">
          Analytics
        </p>
        <h2 className="text-helvetica-neue text-5xl font-medium mb-4">
         Understand how developers are using your API
        </h2>
        <p className="text-helvetica-neue mb-4">
         Get powerful analytics about what questions your users have about your docs. Write and rewrite better docs and features based on what developers are looking for.
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
    Allow developers to integrate your API quickly
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
        Developers can debug issues with your code directly on your platform - allowing them to code solve problems and push to production faster than ever before directly on your docs page</p>
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

    <div className=" pt-20  rounded-b-[30] ">
      {/* <img className='max-w-[150px] md:mx-auto ' src={logo} /> */}
    <h2  className="text-helvetica-neue text-5xl px-8 font-semibold md:text-left md:text-center">
    Try DocMonster with a Popular Saas API
    </h2>
    <p className="text-helvetica-neue text-md font-medium mb-4 mx-auto px-8 max-w-[750px] md:text-center" >Ask docmonster any question you want about these popular Saas APIs</p>
    <SectionComponent />
    <p className="text-helvetica-neue text-md font-light mb-4 mx-auto px-8 max-w-[950px] md:text-center" > Disclaimer: Docmonster has no affiliation with twillio SendGrid as customers, users or otherwise. This tool is purely demonstrative and not intended to be used outside of docmonster.</p>
 
 
  </div>
 
    <section className=" pb-16 mt-8 ">
 
{/* Pricing Section */}
<section className="py-16 "ref={targetRef}>

      </section>

      
    <div className="container mx-auto mt-8" >
      <div className="grid grid-cols-1 md: gap-8">

        {/* FAQ Item 1 */}

        <div className="bg-white p-4 rounded-lg shadow border-2 border-grey">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleAnswer('answer6')}
          >
            <h2 className="text-lg font-semibold">Where can I try the bot before I buy a plan?</h2>
            <span className="text-gray-500">{answersVisible.answer6 ? '-' : '+'}</span>
          </div>
          {answersVisible.answer6 && (
            <div className="mt-4">
              <p className="text-gray-600">
            Our bots are free to use till you're ready to go live with it. Create an account to get started with a bot for free today!
              </p>
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow border-2 border-grey">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleAnswer('answer1')}
          >
            <h2 className="text-lg font-semibold">How does Docmonster work? What models are supported?</h2>
            <span className="text-gray-500">{answersVisible.answer1 ? '-' : '+'}</span>
          </div>
          {answersVisible.answer1 && (
            <div className="mt-4">
              <p className="text-gray-600">
                Docmonster uses OpenAI's LLMs like GPT-3.5 today. Models use RAG to understand your API Docs and help your users integrate your API into thier website. We're bringing support for Mistral and CodeLlama and a few other models soon.
              </p>
            </div>
          )}
        </div>

        {/* FAQ Item 2 */}
     

        {/* FAQ Item 3 */}
        <div className="bg-white p-4 rounded-lg shadow border-2 border-grey">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleAnswer('answer3')}
          >
            <h2 className="text-lg font-semibold">How do I integrate docmonster into my website?</h2>
            <span className="text-gray-500">{answersVisible.answer3 ? '-' : '+'}</span>
          </div>
          {answersVisible.answer3 && (
            <div className="mt-4">
              <p className="text-gray-600">
                Integrating DocMonster is quite straightforward. Our integration involves a script tag based integration that uses 3 lines of code, no more. It's compatible with just about any tech stack. If you need help with integration, reach out to us on teamdocmonster@gmail.com for a free custom integration.
              </p>
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow border-2 border-grey">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleAnswer('answer4')}
          >
            <h2 className="text-lg font-semibold">What types of documents can i upload?</h2>
            <span className="text-gray-500">{answersVisible.answer4 ? '-' : '+'}</span>
          </div>
          {answersVisible.answer4 && (
            <div className="mt-4">
              <p className="text-gray-600">
          We support a plethora of file types including: .c .cpp .csv .docx .html .java .json .md .pdf .php .pptx .py .rb .tex .txt .css. We only allow text based files, an image based PDF will not work yet, but we're adding support for that in the future.            
              </p>
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow border-2 border-grey">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleAnswer('answer6')}
          >
            <h2 className="text-lg font-semibold">Can i use custom colors on my bot?</h2>
            <span className="text-gray-500">{answersVisible.answer6 ? '-' : '+'}</span>
          </div>
          {answersVisible.answer6 && (
            <div className="mt-4">
              <p className="text-gray-600">
               Right now we offer a dark theme on bots. If you need a specific spec please reach out to us on teamdocmonster@gmail.com for a free custom integration with your brand colors.
              </p>
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow border-2 border-grey">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleAnswer('answer2')}
          >
            <h2 className="text-lg font-semibold">What happens if I run out of credits?</h2>
            <span className="text-gray-500">{answersVisible.answer2 ? '-' : '+'}</span>
          </div>
          {answersVisible.answer2 && (
            <div className="mt-4">
              <p className="text-gray-600">
            Our plans support generous usage, but if you run out of credits, you can add a booster pack for additional messages. Alternatively, you can choose to make the bot hide from your website after it's quota. 
              </p>
            </div>
          )}
        </div>

        {/* FAQ Item 4 */}
     

        {/* FAQ Item 5 */}
        <div className="bg-white p-4 rounded-lg shadow border-2 border-grey">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleAnswer('answer5')}
          >
            <h2 className="text-lg font-semibold">Can I cancel my subscription at any time?</h2>
            <span className="text-gray-500">{answersVisible.answer5 ? '-' : '+'}</span>
          </div>
          {answersVisible.answer5 && (
            <div className="mt-4">
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time under the Billings page in the dashboard.
              </p>
            </div>
          )}
        </div>

        {/* FAQ Item 6 */}
        <div className="bg-white p-4 rounded-lg shadow border-2 border-grey">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleAnswer('answer6')}
          >
            <h2 className="text-lg font-semibold">I need help integrating my bot, do you offer suport?</h2>
            <span className="text-gray-500">{answersVisible.answer6 ? '-' : '+'}</span>
          </div>
          {answersVisible.answer6 && (
            <div className="mt-4">
              <p className="text-gray-600">
                Absolutely! We provide dedicated customer support to assist you with any questions, issues, or customization needs. Our support team is available via email on teamdocmonster@gmail.com during business hours.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>



{/* Let's Get Started Section */}

<div className=" p-8 mt-8 items-center justify-center md:text-left md:text-center ">
  <h2 className="text-4xl font-medium mb-4 " >Get Started Today</h2>
  <p className="text-gray-600 mb-4">Get started today and have a working agent with three simple steps</p>

  <div className="flex space-x-4 md:items-center justify-center">
    <button className=" py-2 px-4 rounded-md "style={{ color: '#FFFFFF', backgroundColor: '#21C55D' }} ><Link to="/Signup" style={{  color: '#FFFFFF', textDecoration: 'none' }}>Get Started</Link></button>
    
    <button className="border border-21C55D text-21C55D py-2 px-4 rounded-md" style={{ color: '#C2C2C2' }} ><Link to="/Pricing" style={{  color: '#D9D9D9', textDecoration: 'none' }}>View Pricing</Link></button>
  </div>
</div>


</section>



</>

  );
}

export default NewHome


const YouTubeLightboxButton = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = () => {
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const handleOverlayClick = (e) => {
    // Close the lightbox if the click is outside the video overlay
    if (e.target.classList.contains('lightbox-overlay')) {
      closeLightbox();
    }
  };

  return (
    <div className="relative">
      <button onClick={openLightbox} className="button-1-gradient secondary w-inline-block" aria-label="open lightbox">
        <div className="secondary-button centered-content">
          <div className="hero-button-icon-container">
            {/* Use the YouTube video thumbnail as the button icon */}
           
          </div>
          <div>TL;DR in 30 sec</div>
        </div>
      </button>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center lightbox-overlay" onClick={handleOverlayClick}>
          <div className="mt-16 m-8 bg-white p-4 rounded-md max-w-full max-h-full overflow-auto">
            {/* YouTube Video Embed */}
            <iframe

            
             className='md: min-w-[500px] min-h-[450px] lg:min-w-[750px] min-h-[550px]  '
              src="https://www.youtube.com/embed/rQ3oUKvedgQ?si=AYNfcHZH-Bras7dS"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>


            {/* Close Button */}
            <button onClick={closeLightbox} className="absolute top-2 right-2 text-white text-xl">
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
