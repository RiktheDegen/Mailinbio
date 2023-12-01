import React from 'react'




const Home = () => {
  return (
    <div>Home

      ToDo: Need to create a new global context in context API to store the uploadedDocuments Array to then resuse the current uploads sections later do it without fail slut
      <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Power Your Business with Our Services</h1>
          <p className="text-lg md:text-xl opacity-80 mb-8">
            Explore innovative solutions to boost your success and streamline your operations.
          </p>
          <button className="bg-white text-blue-500 py-3 px-8 rounded-lg font-semibold hover:bg-blue-400 transition duration-300">
            Get Started
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">What Our Clients Say</h2>
          <div className="flex justify-center items-center flex-wrap">
            {/* Placeholder Testimonial Cards */}
            <div className="bg-white p-8 rounded-lg shadow-md mx-4 max-w-md mb-6">
              <p className="text-gray-800 mb-4">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra eros et
                neque commodo, vel ullamcorper odio cursus."
              </p>
              <p className="font-semibold text-blue-500">John Doe, CEO at TechCo</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md mx-4 max-w-md mb-6">
              <p className="text-gray-800 mb-4">
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat."
              </p>
              <p className="font-semibold text-blue-500">Jane Smith, CTO at InnovateCorp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Key Features</h2>
          <div className="flex justify-center items-center flex-wrap">
            {/* Placeholder Feature Cards */}
            <div className="bg-white p-6 rounded-md shadow-md mx-4 max-w-md mb-6">
              {/* Placeholder Icon */}
              <div className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <p className="font-semibold mb-2">Fast and Reliable</p>
              <p className="text-gray-800">Experience fast and reliable services that scale with your business.</p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-md mx-4 max-w-md mb-6">
              {/* Placeholder Icon */}
              <div className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <p className="font-semibold mb-2">Secure and Trusted</p>
              <p className="text-gray-800">Ensuring the highest level of security and trust for your data.</p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-md mx-4 max-w-md mb-6">
              {/* Placeholder Icon */}
              <div className="bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <p className="font-semibold mb-2">Innovative Solutions</p>
              <p className="text-gray-800">Discover innovative solutions to meet your business challenges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Choose Your Plan</h2>
          <div className="flex justify-center items-center flex-wrap">
            {/* Pricing cards for Basic, Power, and Enterprise plans */}
            <div className="bg-white p-8 rounded-lg shadow-md mx-4 max-w-sm mb-6">
              <h3 className="text-xl font-bold mb-4">Basic Plan</h3>
              <ul className="text-gray-800 mb-4">
                <li>Advanced Analytics</li>
                <li>24/7 Customer Support</li>
                <li>Custom Integrations</li>
              </ul>
              <p className="text-2xl font-bold mb-4">$19/month</p>
              <button className="bg-blue-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-400 transition duration-300">
                Choose Plan
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md mx-4 max-w-sm mb-6">
              <h3 className="text-xl font-bold mb-4">Power Plan</h3>
              <ul className="text-gray-800 mb-4">
                <li>Advanced Analytics</li>
                <li>24/7 Customer Support</li>
                <li>Custom Integrations</li>
                <li>Priority Access</li>
              </ul>
              <p className="text-2xl font-bold mb-4">$49/month</p>
              <button className="bg-blue-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-400 transition duration-300">
                Choose Plan
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md mx-4 max-w-sm mb-6">
              <h3 className="text-xl font-bold mb-4">Enterprise Plan</h3>
              <ul className="text-gray-800 mb-4">
                <li>Advanced Analytics</li>
                <li>24/7 Customer Support</li>
                <li>Custom Integrations</li>
                <li>Priority Access</li>
                <li>Dedicated Account Manager</li>
              </ul>
              <p className="text-2xl font-bold mb-4">Contact Us</p>
              <button className="bg-blue-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-400 transition duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
  )
}

export default Home