import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    
    <div className='flex flex-col md:flex-row flex-wrap bg-cyan-600 rounded-lg px-6 md:px-10 lg:px-20'>
      
      {/*----Left Side-----*/}
      <div className='md:w-1/2 flex flex-col items-center md:items-start justify-center gap-4 py-10 m-auto  md:py-[10vw] md:mb-[-30px]  '>  
        <p className='text-center md:text-left text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-snug md:leading-tight lg:leading-tight '>
            Find . Book . Heal <br/> 
            <span className="text-cyan-100 font-semibold">Trusted Doctors, Verified Care.</span>
        </p>
        <span className="text-xs text-cyan-100 bg-white/10 px-3 py-1 rounded-full">
        ✔ Verified Doctors · Secure Booking
        </span>
        <div className='flex flex-col md:flex-row items-center md:items-start gap-3 text-white text-sm font-light text-center md:text-left'>
            <img className='w-28' src={assets.group_profiles} alt=''/>
            <p>Browse trusted doctors, book in minutes, and  <br className='hidden sm:block'/>get the care you need—anytime, anywhere.</p>
            
        </div>
        <a href='#speciality' className=' flex items-center gap-2 bg-white text-cyan-700 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-cyan-50 hover:scale-105 transition-all duration-300'>
            Book appointment<img className='w-3' src={assets.arrow_icon} alt=''/>
        </a>
      </div>

      {/*-----Right Side----*/}
      <div className='md:w-1/2 relative'> 
      <div className="absolute bottom-0 left-12 w-[80%] h-[60%] bg-black/25 blur-3xl rounded-full"></div>
        <img className="relative w-full md:absolute bottom-0 drop-shadow-2xl" src={assets.header_img} alt=''/>

      </div>
    </div>
  )
}
export default Header
