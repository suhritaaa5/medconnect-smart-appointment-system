import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate =useNavigate()
  return (
    <div className='md:mx-10'>
      
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        
        {/* Left */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt='' />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>Your trusted healthcare partner. Book appointments, consult specialists, and manage your medical records seamlessly.</p>
        </div>

        {/* Right */}
        <div>
          <p className="text-gray-700 text-xl font-medium mb-5">Quick Links</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="cursor-pointer hover:text-black transition" onClick={() => navigate("/")}>Home</li>
            <li className="cursor-pointer hover:text-black transition" onClick={() => navigate("/about")}>About Us</li>
            <li className="cursor-pointer hover:text-black transition" onClick={() => navigate("/contact")}>Contact Us</li>
            <li className="cursor-pointer hover:text-black transition" onClick={() => navigate("/privacy-policy")}>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-gray-700 text-xl font-medium mb-5">Support</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="cursor-pointer hover:text-black transition">FAQs</li>
            <li className="cursor-pointer hover:text-black transition">Help Center</li>
            <li className="cursor-pointer hover:text-black transition">Terms & Conditions</li>
          </ul>
        </div>

      </div>

      <hr />
      <p className='py-5 text-sm text-center text-gray-700'>Copyright 2025 @MedConnect</p>

    </div>
  )
}

export default Footer
