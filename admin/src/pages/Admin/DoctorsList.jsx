import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors ,changeAvailability} = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className="m-5">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6"> All Doctors<span className="text-cyan-500">.</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctors.map((item, index) => (
          <div key={index}className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex gap-6 items-center hover:border-gray-300 hover:shadow-md hover:-translate-y-[2px] transition-all duration-200">
            <div className="bg-cyan-50 p-3 rounded-lg">
              <img src={item.image}alt="" className="w-28 h-28 object-cover rounded-md"/>
            </div>
            <div className="flex-1">
              <p className="text-lg font-medium text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500"> {item.speciality}</p>
            </div>
            <div className="flex items-center gap-2">
              <input onChange={()=>changeAvailability(item._id)}type="checkbox" checked={item.available} className="accent-cyan-500" />
              <span className="text-sm text-gray-600">Available </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
