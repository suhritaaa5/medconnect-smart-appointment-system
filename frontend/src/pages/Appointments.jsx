import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointments = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  // Fetch doctor info
  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }


  // Generate available slots for 7 days
  const getAvailableSlots = async () => {
    if (!docInfo) return
    const today = new Date()
    let allSlots = []

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      // End time = 21:00 for all days
      let endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      // Start time
      if (i === 0) {
        let hours = currentDate.getHours()
        let minutes = currentDate.getMinutes()

        // Round up to next 30-min slot
        if (minutes > 0 && minutes <= 30) minutes = 30
        else if (minutes > 30) {
          minutes = 0
          hours += 1
        }
        // Ensure start is not before 10 AM
        if (hours < 10) hours = 10

        currentDate.setHours(hours, minutes, 0, 0)

        // If after rounding, time is still in the past, move to next slot
        if (currentDate < new Date()) {
          currentDate.setMinutes(currentDate.getMinutes() + 30)
        }
      } else {
        currentDate.setHours(10, 0, 0, 0)
      }

      let timeSlots = []
      const now = new Date()

      while (currentDate < endTime) {
        // Skip past slots for today
        if (i === 0 && currentDate < now) {
          currentDate.setMinutes(currentDate.getMinutes() + 30)
          continue
        }

        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })

        const day = currentDate.getDate()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()
        const slotDate = `${day}_${month}_${year}`

        // Check if slot is already booked
        const isSlotAvailable = !docInfo.slots_booked?.[slotDate]?.includes(formattedTime)

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        // Move to next 30-min slot
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      allSlots.push(timeSlots)
    }

    setDocSlots(allSlots)
  }

  // Book appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    if (!slotTime) {
      toast.warn("Please select a time slot")
      return
    }

    try {
      const selectedSlot = docSlots[slotIndex]?.find(s => s.time === slotTime)
      if (!selectedSlot) return

      const date = selectedSlot.datetime
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const slotDate = `${day}_${month}_${year}`

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        if (data.message?.toLowerCase().includes('complete your profile')) {
          toast.warn(data.message)
          return navigate('/my-profile') 
        }
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }



  // Effects
  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    if (!docInfo) return

    if (!docInfo.available) {
      toast.info('Doctor is not available right now')
      return
    }

    getAvailableSlots()
  }, [docInfo])


  return docInfo && (
    <div className="px-6 md:px-20 py-10">

      {/* Doctor Details */}
      <div className="flex flex-col md:flex-row gap-10 bg-white shadow-md border border-gray-200 rounded-xl p-6">
        <div className="flex justify-center md:block">
          <img src={docInfo.image} alt={docInfo.name} className="bg-blue-100 w-full sm:max-w-72 object-cover rounded-lg shadow-sm" />
        </div>

        <div className="flex flex-col border-gray-400 gap-4">
          <p className="text-2xl font-semibold flex items-center gap-2">
            {docInfo.name} <img src={assets.verified_icon} className="w-6 h-6" alt="verified" />
          </p>
          <p className="text-gray-600 text-lg">{docInfo.degree} — <span className="font-medium">{docInfo.speciality}</span></p>
          <button className="bg-blue-100 text-sky-700 px-3 py-1 rounded-lg w-fit text-sm font-medium">{docInfo.experience}</button>

          <div className="mt-3">
            <p className="text-gray-800 font-semibold flex items-center gap-2"> About <img src={assets.info_icon} className="w-5" alt="info" /></p>
            <p className="text-gray-600 leading-6 mt-1">{docInfo.about}</p>
          </div>

          <p className="text-gray-600 font-medium mt-4">
            Appointment fee : <span className="text-grey-800">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>
      {/* Booking Slots */}
      {docInfo.available ? (
        <div className="sm:ml-72 sm:pl-4 mt-6 font-medium text-gray-700">

          <p className="text-lg font-semibold mb-3">Booking Slots</p>

          {/* Day Cards */}
          <div className="flex gap-4 overflow-x-auto pb-3">
            {docSlots.map((daySlots, index) => (
              <div
                key={index}
                onClick={() => {
                  if (daySlots.length > 0) {
                    setSlotIndex(index)
                    setSlotTime('')
                  }
                }}
                className={`min-w-[110px] ${daySlots.length === 0
                  ? 'bg-gray-100 cursor-not-allowed text-gray-400'
                  : 'bg-white cursor-pointer hover:border-blue-500 hover:shadow-md hover:bg-blue-50'
                  } border border-gray-200 rounded-xl shadow-sm p-3 flex flex-col items-center transition-all ${slotIndex === index ? 'border-sky-600' : ''
                  }`}
              >
                <p className="text-sm font-medium text-gray-500">
                  {daySlots[0] && daysOfWeek[daySlots[0].datetime.getDay()]}
                </p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {daySlots[0] && daySlots[0].datetime.getDate()}
                </p>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="flex flex-wrap gap-3 mt-4">
            {docSlots[slotIndex]?.length > 0 ? (
              docSlots[slotIndex].map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all
              ${slotTime === item.time
                      ? 'bg-sky-600 text-white border-sky-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-sky-500'
                    }`}
                >
                  {item.time}
                </button>
              ))
            ) : (
              <p className="text-gray-500">No available slots for this day</p>
            )}
          </div>

          {/* Book Button */}
          <button
            onClick={bookAppointment}
            disabled={!slotTime}
            className={`mt-6 px-6 py-3 rounded-lg font-medium transition-all
        ${!slotTime
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-sky-600 hover:bg-sky-700 text-white'
              }`}
          >
            Book an appointment
          </button>
        </div>
      ) : (
        <div className="sm:ml-72 sm:pl-4 mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-yellow-700">
          Doctor is currently unavailable.
          Please check back later or explore other doctors.
        </div>
      )}

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointments
