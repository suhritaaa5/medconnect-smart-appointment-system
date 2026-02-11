import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    
    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }

    if (dToken) {
      setDToken('')
      localStorage.removeItem('dToken')
    }
  }

  return (
    <div className="flex items-center justify-between px-4 sm:px-10 py-3 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3 text-xs">
        <img
          src={assets.admin_logo}
          alt=""
          className="w-36 sm:w-40 cursor-pointer"
        />
        {(aToken || dToken) && (
          <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
            {aToken ? 'Admin' : 'Doctor'}
          </p>
        )}
      </div>

      {(aToken || dToken) && (
        <button
          onClick={logout}
          className="px-4 py-1.5 text-sm font-medium text-white bg-cyan-500 rounded-md hover:bg-cyan-600 transition"
        >
          Logout
        </button>
      )}
    </div>
  )
}

export default Navbar
