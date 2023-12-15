import React, {useState} from 'react'
import './NewHome.css'

function NewHome() {
   
    return (
    <>
      <section className="bg-white p-8 md:p-16 text-left md:text-center">
      <h3 className="text-helvetica-neue font-medium mb-4 text-4xl sm:text-4xl md:text-4xl lg:text-4xl  text-left md:text-center">
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
      <div className="md:w-1/3 md:max-w-[calc(100% - 2rem)] md:ml-4 mb-4">
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
  <div className="md:w-2/3 md:max-w-[calc(100% - 2rem)] md:mr-4 mb-4">
    <img
      src="../src/assets/Group 12.png"  // Replace with your image path
      alt="Description of the image"
      className="mx-auto w-auto h-auto"
    />
  </div>

  {/* Text Section */}
  <div className="md:w-1/3 md:ml-8">
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

</>
  );
}

export default NewHome