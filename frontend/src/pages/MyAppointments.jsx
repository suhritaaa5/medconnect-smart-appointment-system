import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const navigate = useNavigate()
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments)
        console.log(data.appointments)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { token } })
          if (data.success) {
            getUserAppointments()
            navigate('/my-appointments')

          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)

        }
      }

    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {

        initPay(data.order)
      }
    } catch (error) {
      console.log(error)
      toast.error('Payment failed. Try again.')
    }
  }



  useEffect(() => {
    if (!token) return

    // initial load
    getUserAppointments()

    const handleFocus = () => {
      getUserAppointments()
    }

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        getUserAppointments()
      }
    }

    window.addEventListener("focus", handleFocus)
    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      window.removeEventListener("focus", handleFocus)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [token])


  return (
    <div className="px-4 sm:px-10">
      <p className="pb-3 mt-12 text-lg font-medium text-gray-700 border-b"> My Appointments </p>
      <div className="mt-6 space-y-4">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-4 border border-blue-200 rounded-xl p-4 bg-white shadow-sm" >
            <div>
              <img className="w-28 h-28 object-cover rounded-lg bg-blue-50" src={item.docData.image} alt="" />
            </div>

            <div className="flex-1 text-sm text-gray-600">
              <p className="text-gray-800 font-semibold text-base"> {item.docData.name}</p>
              <p className="text-gray-500">{item.docData.speciality}</p>

              <p className="mt-2 text-gray-700 font-medium">Address</p>
              <p>{item.docData.address.line1}</p>
              <p>{item.docData.address.line2}</p>

              <p className="mt-2">
                <span className="font-medium text-gray-700">
                  Date & Time:   </span>{slotDateFormat(item.slotDate)} | {item.slotTime}

              </p>
            </div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>}
              {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={() => appointmentRazorpay(item._id)} className="px-4 py-2 text-sm font-medium rounded-lg border border-cyan-500 text-cyan-600 hover:bg-cyan-500 hover:text-white transition-all">
                Pay Online
              </button>}

              {!item.cancelled && !item.isCompleted && item.payment &&<button onClick={() => cancelAppointment(item._id)} className="px-4 py-2 text-sm font-medium rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                Cancel Appointment
              </button>}
              {item.cancelled && !item.isCompleted && <button className="sm:min-w-28 px-3 py-1 text-sm font-medium rounded text-red-600 border border-red-400 text-center">Appointment Cancelled</button>}
              {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
