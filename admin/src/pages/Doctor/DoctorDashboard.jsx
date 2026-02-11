import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData()

    }
  }, [dToken])
  return dashData && (
    <div className='m-5'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-xl shadow-md flex items-center gap-4 border-l-4 border-cyan-500 hover:shadow-lg transition'>
          <img src={assets.earning_icon} alt='' className='w-12' />
          <div>
            <p className='text-2xl font-bold text-cyan-800'>{currency}{dashData.earnings} </p>
            <p className='text-gray-600 font-medium'>Earnings</p>
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
                  <img className="w-12 h-12 rounded-full object-cover border" src={item.userData.image} alt="" />
                  <p className="font-medium text-gray-800">{item.userData.name}</p>
                  <p className="text-sm text-gray-500">{slotDateFormat(item.slotDate)}</p>
                </div>
                {
                  item.cancelled
                    ? <p className='text-red-400 text-xs font-medium text-center'>Cancelled</p>

                    : item.isCompleted
                      ? <p className='text-green-500 text-xs font-medium text-center'>Completed</p>

                      : item.payment
                        ? (
                          <div className="flex justify-center items-center">
                            <img
                            onClick={() => completeAppointment(item._id)}
                              src={assets.tick_icon}
                              alt="Paid"
                              className="w-10"
                            />
                          </div>
                        )

                        : (
                          <div className='flex justify-center items-center gap-2'>
                            <img
                              onClick={() => cancelAppointment(item._id)}
                              className='w-10 cursor-pointer '
                              src={assets.cancel_icon}
                              alt="Cancel"
                            />
                            <img
                              onClick={() => completeAppointment(item._id)}
                              className='w-10 cursor-pointer'
                              src={assets.tick_icon}
                              alt="Complete"
                            />
                          </div>
                        )
                }

              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default DoctorDashboard
