import React, {useState} from 'react'
import { Link, NavLink } from 'react-router-dom';

function Pricing() {
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
      
  
    return (
    <>
    <div className="container-fluid text-center md: mx-auto lg: mx-auto ">
        <h2 className="text-helvetica-neue text-3xl md:text-5xl font-semibold mb-4 mt-10" >DocMonster is free till you're ready to start</h2>
        <p className="mb-2 text-xl" >Get started today with simple pricing. Never pay for more than you use.</p>
        <div className="mt-8 flex justify-center items-center flex-wrap md:space-x-4 lg:space-x-4">
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
           
            <div className="flex items-center justify-left text-left text-gray-800 mb-2">
            <p className="flex mb-2">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
 <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>
GPT-3.5 support</p>
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
            <p className="flex mb-2 ml-2 font-bold"> Coming soon</p>
            <div className="flex items-center justify-left text-gray-800 mb-2">
            <p className="flex mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>
Upto 1000 messages with GPT 4 
              
             </p>
        
           </div>

            <div className="flex items-center justify-left text-gray-800 mb-2">
             
             <p className="mb-2"></p>
           </div>
            {/* Buy Button */}
          <Link to="/Signup">
              <button className="border-2 border-black w-full text-black py-2 px-2 rounded-lg font-semibold  transition duration-300" type="submit">
                Start for free
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
GPT-3.5 support</p>
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

            <p className="flex mb-2 ml-2 font-bold"> Coming soon</p>
            <div className="flex items-center justify-left text-gray-800 mb-2">
            <p className="flex mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>

              
              Upto 2500 messages with GPT 4 
             </p>
          
           </div>

            <div className="flex items-center justify-left text-gray-800 mb-2">
             
             <p className="mb-2"></p>
           </div>
            {/* Buy Button */}
            <Link to="/Signup">
              <button className="border-black border-2 w-full text-black py-2 px-2 rounded-lg font-semibold hover:bg-green-400 transition duration-300" type="submit" >
                Start for free
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


      <div className="container mx-auto mt-8 mb-8" >
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
    
    </>
  )
}

export default Pricing