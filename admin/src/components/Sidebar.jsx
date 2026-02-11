import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
  const {aToken} =useContext(AdminContext)
  const {dToken} =useContext(DoctorContext)

  return (
    <div className="min-h-screen border-r pt-5">
      {aToken && (<ul className="flex flex-col gap-1">
      <NavLink to="/admin-dashboard"
        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300
           ${isActive ? "bg-[#F2F3FF] border-r-4 border-cyan-600 text-cyan-700 font-semibold"
               : ""
           }` }>
        <img src={assets.home_icon} alt="" className="w-5 h-5" />
        <p className='hidden md:block'>Dashboard</p>
      </NavLink>

      <NavLink
        to="/all-appointments"
         className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300
           ${isActive ? "bg-[#F2F3FF] border-r-4 border-cyan-600 text-cyan-700 font-semibold"
               : ""
           }` }>
        <img src={assets.appointment_icon} alt="" className="w-5 h-5" />
        <p className='hidden md:block'>Appointments</p>
      </NavLink>

      <NavLink
        to="/add-doctor"
         className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300
           ${isActive ? "bg-[#F2F3FF] border-r-4 border-cyan-600 text-cyan-700 font-semibold"
               : ""
           }` }>
        <img src={assets.add_icon} alt="" className="w-5 h-5" />
        <p className='hidden md:block'>Add Doctor</p>
      </NavLink>

      <NavLink
        to="/doctor-list"
         className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300
           ${isActive ? "bg-[#F2F3FF] border-r-4 border-cyan-600 text-cyan-700 font-semibold"
               : ""
           }` }>
        <img src={assets.people_icon} alt="" className="w-5 h-5" />
        <p className='hidden md:block'>Doctors List</p>
      </NavLink>
    </ul>
  )}

  {/*doctor panel */}

  {dToken && (<ul className="flex flex-col gap-1">
      <NavLink to="/doctor-dashboard"
        className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300
           ${isActive ? "bg-[#F2F3FF] border-r-4 border-cyan-600 text-cyan-700 font-semibold"
               : ""
           }` }>
        <img src={assets.home_icon} alt="" className="w-5 h-5" />
        <p className='hidden md:block'>Dashboard</p>
      </NavLink>

      <NavLink
        to="/doctor-appointments"
         className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300
           ${isActive ? "bg-[#F2F3FF] border-r-4 border-cyan-600 text-cyan-700 font-semibold"
               : ""
           }` }>
        <img src={assets.appointment_icon} alt="" className="w-5 h-5" />
        <p className='hidden md:block'>Appointments</p>
      </NavLink>

      <NavLink
        to="/doctor-profile"
         className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300
           ${isActive ? "bg-[#F2F3FF] border-r-4 border-cyan-600 text-cyan-700 font-semibold"
               : ""
           }` }>
        <img src={assets.people_icon} alt="" className="w-5 h-5" />
        <p className='hidden md:block'>Profile</p>
      </NavLink>
    </ul>
  )}
</div>

  )
}

export default Sidebar
