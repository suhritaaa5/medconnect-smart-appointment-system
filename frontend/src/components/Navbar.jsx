import React, { useState, useContext } from 'react'

import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

import { AppContext } from '../context/AppContext'


const Navbar = () => {
  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken ,userData} = useContext(AppContext)


  const logout = () => {
  setToken('')
  localStorage.removeItem('token')
  navigate('/login')
}


  return (
    <>
   
      <div className="flex items-center justify-between text-sm py-4 border-b border-gray-400 relative z-30 bg-white">
      
        <img
          onClick={() => navigate('/')} src={assets.logo} alt=""className="w-44 cursor-pointer" />

        <ul className="hidden md:flex items-center gap-5 font-medium">
          <NavLink to="/"><li className="py-1">HOME</li><span className=" h-0.5 bg-sky-900 w-3/5 mx-auto mt-1 hidden"></span></NavLink>
          <NavLink to="/doctors"><li className="py-1">ALL DOCTORS</li><span className=" h-0.5 bg-sky-900 w-3/5 mx-auto mt-1 hidden"></span></NavLink>
          <NavLink to="/about"><li className="py-1">ABOUT</li><span className=" h-0.5 bg-sky-900 w-3/5 mx-auto mt-1 hidden"></span></NavLink>
          <NavLink to="/contact"><li className="py-1">CONTACT</li><span className=" h-0.5 bg-sky-900 w-3/5 mx-auto mt-1 hidden"></span></NavLink>
        </ul>

        <div className="flex items-center gap-4">
          {token && userData ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img className="w-8 rounded-full" src={userData.image} alt="" />
              <img className="w-2.5" src={assets.dropdown_icon} alt="" />

              <div className="absolute right-0 top-full pt-4 hidden group-hover:block z-40">
                <div className="min-w-44 bg-white rounded-md border border-gray-200 flex flex-col text-gray-600">
                  <p onClick={() => navigate('/my-profile')} className="px-4 py-2 hover:bg-gray-50">My Profile</p>
                  <p onClick={() => navigate('/my-appointments')} className="px-4 py-2 hover:bg-gray-50">My Appointments</p>
                  <p onClick={logout} className="px-4 py-2 hover:bg-gray-50">Logout</p>
                </div>
              </div>
            </div>
          ) : (
            <button onClick={() => navigate('/login')}className="bg-sky-700 text-white px-8 py-3 rounded-full hidden md:block" >
              CREATE ACCOUNT
            </button>
          )}

          <img onClick={() => setShowMenu(true)} className="w-6 cursor-pointer md:hidden" src={assets.menu_icon} alt=""/>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-white z-40 transform ${ showMenu ? 'translate-x-0' : 'translate-x-full' } transition-transform duration-300 md:hidden`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-200">
          <img className="w-36" src={assets.logo} alt="" />
          <img
            onClick={() => setShowMenu(false)}
            className="w-6 cursor-pointer"
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <ul className="flex flex-col gap-4 mt-6 px-6 text-gray-700 font-medium">
          <NavLink onClick={() => setShowMenu(false)} to="/" className="py-3 px-4 border border-blue-200 rounded-lg hover:bg-blue-100 transition-all">HOME</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/doctors" className="py-3 px-4 border border-blue-200 hover:bg-blue-100 transition-all rounded-lg">ALL DOCTORS</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/about" className="py-3 px-4 border border-blue-200 hover:bg-blue-100 transition-all rounded-lg">ABOUT</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/contact" className="py-3 px-4 border border-blue-200 hover:bg-blue-100 transition-all rounded-lg">CONTACT US</NavLink>
        </ul>
      </div>
    </>
  )
}

export default Navbar
