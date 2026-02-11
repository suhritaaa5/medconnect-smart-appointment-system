import React from 'react'
import { useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'


const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)
  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className="text-xl font-semibold text-cyan-600 mb-4">All Appointments</p>
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_2fr_2fr_1fr] px-4 py-3 text-sm font-medium bg-white text-black">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date&Time</p>
          <p>Doctor Name</p>
          <p>Fee</p>
          <p>Status</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div className='grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_2fr_2fr_1fr] items-center text-gray-700 px-4 py-3 border-b bg-cyan-50 hover:bg-gray-100 max-sm:flex max-sm:flex-wrap max-sm:gap-2' key={index}>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-4'>
              <img className='w-8 rounded-full ' src={item.userData.image} alt='' />
              <p>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
            <div className='flex items-center gap-4'>
              <img className='w-8 rounded-full bg-gray-200 ' src={item.docData.image} alt='' />
              <p>{item.docData.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            <p className={
              item.payment
                ? "text-green-600 font-medium"
                : "text-gray-600 font-medium"
            }>
              {item.payment ? "Paid" : "Pending"}
            </p>
            {item.cancelled ? (
  <button className="w-20 px-3 py-1 text-sm rounded border border-red-400 text-red-600">
    Cancelled
  </button>
) : item.isCompleted ? (
  <button className="w-20 py-1 text-sm rounded border border-green-400 text-green-600">
    Completed
  </button>
) : item.payment ? (
  <button className="w-20 py-1 text-sm rounded border border-green-400 text-green-600">
    Paid
  </button>
) : (
  <button
    onClick={() => cancelAppointment(item._id)}
    className="w-20 px-3 py-1 text-sm rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
  >
    X
  </button>
)}

          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments
