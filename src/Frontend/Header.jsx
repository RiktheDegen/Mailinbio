// import React, { useContext } from 'react'
// import {Link, NavLink} from 'react-router-dom'
// import {UserContext} from '../context/UserContext'



// export default function Header() {
//     const context = useContext(UserContext)

//   return (
//       <header className="shadow sticky z-50 top-0">
//           <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
//               <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
//                   <Link to="/" className="flex items-center">
//                       <img
//                           src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
//                           className="mr-3 h-12"
//                           alt="Logo"
//                       />
//                   </Link>
        

//                   <div className="flex items-center lg:order-2">
                  
//                   <Link
//                           onClick={() => {context.setUser(null)}}
//                           to="/"
//                           className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
//                       >
//                       { context.user ? (<>
//                       Logout
//                       </>) : (<><Link
//                           to="/Signin"
//                           className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
//                       >
//                           Sign in 
//                       </Link>
//                       <Link
//                           to="/Signup"
//                           className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
//                       >
//                           Sign up
//                       </Link>
//                       </>)}
//                       </Link>
                      
//                       <Link
//                           to="#"
//                           className="text-white bg-blue-600 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
//                       >
//                         {context.user?.email? context.user.email:"Get started"}   
//                       </Link>
//                   </div>
//                   <div
//                       className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
//                       id="mobile-menu-2"
//                   >
//                       <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
//                           <li>
//                               <NavLink
//                                   className={() =>
//                                       `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                   }
//                               >
//                                   Home
//                               </NavLink>
//                           </li>
//                           <li>
//                               <NavLink
//                               to = ""
//                                   className={() =>
//                                       `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                   }
//                               >
//                                   About
//                               </NavLink>
//                           </li>
//                           <li>
//                               <NavLink
//                               to = ""
//                                   className={() =>
//                                       `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
//                                   }
//                               >
//                                   Testing
//                               </NavLink>
//                           </li>
//                       </ul>
//                   </div>
//               </div>
//           </nav>
//       </header>
//   );
// }

import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Header() {
  const context = useContext(UserContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="../src/assets/icon (1).png"
              className="mr-3 h-20"
              alt="Logo"
            />
          </Link>

          <div className="lg:hidden">
            <button
              onClick={toggleDropdown}
              className="text-gray-800 hover:bg-gray-50  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              ☰
            </button>
          </div>

          <div
            className={`lg:hidden ${isDropdownOpen ? 'block' : 'hidden'}`}
          >
            <ul className="flex flex-col font-medium space-y-2">
              <li>
                <NavLink
                  to="/"
                  onClick={toggleDropdown}
                  className="block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
                  style={{ textDecoration: 'none', color: '#1F2937' }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to=""
                  onClick={toggleDropdown}
                  className="block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
                  style={{ textDecoration: 'none', color: '#1F2937' }}
                >
                  About
                </NavLink>
              </li>
              {context.user ? (
                <li>
                  <Link
                    to="/"
                    onClick={() => {
                      context.setUser(null);
                      toggleDropdown();
                    }}
                    className="block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
                    style={{ textDecoration: 'none', color: '#1F2937' }}
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    to="/Signin"
                    onClick={toggleDropdown}
                    className="block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
                    style={{ textDecoration: 'none', color: '#1F2937' }}
                 >
                    Sign in
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/Signup"
                  onClick={toggleDropdown}
                  className="block py-2 pr-4 pl-3 duration-200 border-b border-gray-100  rounded-2 lg:hover:bg-transparent lg:border-0 hover:text-white lg:p-0"
                  style={{ backgroundColor: '#2D3748', color: '#FFFFFF', textDecoration: 'none' }}
                
                >
                  Get started
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden lg:flex items-center lg:order-2">
            <Link
              onClick={() => {
                context.setUser(null);
              }}
              to="/"
              className="text-gray-800 hover:bg-gray-50  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              style={{ textDecoration: 'none', color: '#1F2937' }}
            >
              {context.user ? (
                <>Logout</>
              ) : (
                <>
                  <Link
                    to="/Signin"
                    className="text-gray-800 hover:bg-gray-50  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none" style={{ textDecoration:'none', Color: '#1F2937' }}
                  
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/Signup"
                    className="text-white bg-21C55D inline-block hover:bg-green-700  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                    style={{ textDecoration:'none', backgroundColor: '#2D3748', color: '#1F2937' }}
                  >
                    Get started
                  </Link>
                </>
              )}
            </Link>
          </div>

          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  style={{ textDecoration: 'none', color: '#1F2937' }}
                  className={() =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to=""
                  style={{ textDecoration: 'none', color: '#1F2937' }}
                  className={() =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  style={{ textDecoration: 'none', color: '#1F2937' }}
                  className={() =>
                    `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
