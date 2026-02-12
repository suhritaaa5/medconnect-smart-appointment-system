import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
  const { aToken, getDashData, dashData, cancelAppointment } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)
  const handleCancel = async (id) => {
  await cancelAppointment(id)
  await getDashData()
}

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (

    <div className='m-5'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-xl shadow-md flex items-center gap-4 border-l-4 border-cyan-500 hover:shadow-lg transition'>
          <img src={assets.doctor_icon} alt='' className='w-12' />
          <div>
            <p className='text-2xl font-bold text-cyan-800'>{dashData.doctors} </p>
            <p className='text-gray-600 font-medium'> Doctors </p>
          </div>
        </div>
        <div className='bg-white p-6 rounded-xl shadow-md flex items-center gap-4 border-l-4 border-cyan-500 hover:shadow-lg transition'>
          <img src={assets.appointments_icon} alt='' className='w-12' />
          <div>
            <p className='text-2xl font-bold text-cyan-800'>{dashData.appointments} </p>
            <p className='text-gray-600 font-medium'>Appointments </p>
          </div>
        </div>
        <div className='bg-white p-6 rounded-xl shadow-md flex items-center gap-4 border-l-4 border-cyan-500 hover:shadow-lg transition'>
          <img src={assets.patients_icon} alt='' className='w-12' />
          <div>
            <p className='text-2xl font-bold text-cyan-800'> {dashData.patients} </p>
            <p className='text-gray-600 font-medium'> Patients </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5 mt-6 border border-cyan-100">


        <div className="flex items-center gap-3 mb-4 border-b pb-3">
          <div className="p-2 bg-cyan-100 rounded-lg">
            <img src={assets.list_icon} alt="" className="w-6 h-6" />
          </div>

          <p className="text-lg font-semibold text-cyan-600">
            Latest Bookings
          </p>
        </div>
        <div>
          {
            dashData.latestAppointments.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 mb-3 bg-white rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-center gap-3">
                  <img className="w-12 h-12 rounded-full object-cover border" src={item.docData.image} alt="" />
                  <p className="font-medium text-gray-800">{item.docData.name}</p>
                  <p className="text-sm text-gray-500">{slotDateFormat(item.slotDate)}</p>
                </div>
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
                    onClick={() => handleCancel(item._id)}
                    className="w-20 px-3 py-1 text-sm rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    X
                  </button>
                )}
              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Dashboard
