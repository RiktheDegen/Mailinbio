import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import logo from '../static/icon (1).png'

function Footer() {
  return (
    <footer className="  bg-white border-y">
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0 items-center justify-center">
                <Link to="/" className="flex items-center justify-center">
                    <img
                        src={logo}
                        className="mr-3 h-20"
                        alt="Logo"
                    />
                </Link>
            </div>
          
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center">
                © 2023
                <a href=""  className="mx-2 py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0"
                  style={{ textDecoration: 'none', color: '#1F2937' }}>
                   Team DocMonster
                </a>
                . All Rights Reserved.
            </span>
           
        </div>
    </div>
</footer>
  )
}

export default Footer