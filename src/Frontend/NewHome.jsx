import React, { useState, useEffect } from 'react'
import './NewHome.css'

function NewHome() {
    const [activeStep, setActiveStep] = useState(1);

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
    

    return (
    <>
      <section className="bg-white p-8 md:p-16 text-left md:text-center" >
      <h3 className="text-helvetica-neue font-regular mb-8 text-5xl sm:text-5xl md:text-5xl lg:text-5xl  text-left md:text-center">
      Convert and Retain More Developers With AI That Understands Your Docs
      </h3>
      <div className=" md:w-2/3 mx-auto">
      <img
  srcSet="
    ../src/assets/Frame1.png 420w,  // Small viewport image
    ../src/assets/Frame11.png768w,
  "
  sizes="
    (max-width: 420px) 420px,        // Small viewport size
    (max-width: 768px) 768px,
    100vw
  "
  src="../src/assets/Frame11.png" // Default image for browsers that do not support srcset
  alt="Description of the image"
  className="mb-8 mx-auto text-center w-full h-auto max-w-[500px]"
/>
      </div>
    </section>

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
          src="../src/assets/Group 11.png"  // Replace with your image path
          alt="Description of the image"
          className="mx-auto max-w-[1/2vw] self-right"
        />
      </div>
    </section>    

    <section className="mt-8 mb-8 flex flex-col-reverse md:flex-row  bg-white p-8 md:p-16 max-w-[1200px] mx-auto">
  {/* Image Section */}
  <div className="md:w-1/2 md:max-w-[calc(100% - 2rem)] md:mr-4 mb-4">
    <img
      src="../src/assets/Group 12.png"  // Replace with your image path
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
          src="../src/assets/Frame 6.png"  // Replace with your image path
          alt="Description of the image"
          className="mx-auto max-w-[1/2vw] self-right"
        />
      </div>
    </section>    
 
    <section style={{ background: '#1F2937' }} className="pb-16 mt-8 ">
  <div style={{ background: '#1F2937' }} className=" pb-16 rounded-tl-2xl rounded-tr-2xl">
    <h2 style={{ color: '#C2C2C2' }} className="text-4xl p-8 md:text-left md:text-center">
      Build Your Agent In Three Easy Steps
    </h2>
  </div>
  <div className="container">
    <div className="flex flex-col lg:flex-row flex-grow">
      {/* Step 1 */}
      <div style={{ color: '#C2C2C2' }} className="flex items-center justify-center flex-grow mt-4">
        <div style={{ borderColor: '#C2C2C2' }} className="border border-4 rounded-full w-24 h-24 flex items-center justify-center font-bold text-3xl">
          1
        </div>
        <div className="text-center">
          <div style={{ color: '#C2C2C2' }} className="text-lg font-regular mt-2 ml-8">Upload</div>
        </div>
      </div>

      {/* Step 2 */}
      <div style={{ color: '#C2C2C2' }} className="flex items-center justify-center flex-grow mt-4 lg:mt-0 lg:ml-4">
        <div style={{ borderColor: '#C2C2C2' }} className="border border-4 rounded-full w-24 h-24 flex items-center justify-center font-bold text-2xl">
          2
        </div>
        <div className="text-center">
          <div style={{ color: '#C2C2C2' }} className="text-lg font-regular mt-2 ml-8">Test</div>
        </div>
      </div>

      {/* Step 3 */}
      <div style={{ color: '#C2C2C2' }} className="flex items-center justify-center flex-grow mt-4 lg:mt-0 lg:ml-4">
        <div style={{ borderColor: '#C2C2C2' }} className="border border-4 rounded-full w-24 h-24 flex items-center justify-center font-bold text-2xl">
          3
        </div>
        <div className="text-center">
          <div style={{ color: '#C2C2C2' }} className="text-lg font-regular mt-2 ml-8">Embed</div>
        </div>
      </div>
    </div>
  </div>
</section>


</>

  );
}

export default NewHome