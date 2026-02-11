import React from 'react'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()
  return (
    <div>
  
      {/*left*/}
      <div className='flex bg-cyan-600 rounded-lg px-6  sm:px-10 md:px-14 lg:px-12 mt-20 md:mx-10'>
        <div className=' flex-1 flex flex-col items-center justify-center py-8 sm:py-10 md:py-16 lg:py-24 '>
            <div className=' text-center text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
                <p>Book Your Appointment</p>
                <p className='mt-4'>With Trusted Specialists</p>
            </div>
            <button onClick={()=>{navigate(`/login`);scrollTo(0,0)}}  className='  bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'> Create account</button>
        </div>
      </div>

    </div>
  )
}

export default Banner
