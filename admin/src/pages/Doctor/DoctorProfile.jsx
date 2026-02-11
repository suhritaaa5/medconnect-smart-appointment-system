
import { DoctorContext } from '../../context/DoctorContext'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const updateProfile=async()=>{
    try {
      const updateData={
        address: profileData.address,
        fees:profileData.fees,
        available:profileData.available
      }
      console.log("Updating:", updateData)

      const {data}= await axios.post(backendUrl+'/api/doctor/update-profile',updateData,{headers:{dToken}})
      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()

      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
      
    }
  }
  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])
  return profileData && (
    <div className="bg-gray-50 min-h-screen p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6">

        {/* Profile Image */}
        <div className="flex justify-center">
          <img src={profileData.image} alt="" className="w-40 h-40 rounded-full border-4 border-gray-400 object-cover" />
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-4">

          {/* Name */}
          <h2 className="text-2xl font-bold text-cyan-700"> {profileData.name}</h2>

          {/* Degree + Speciality */}
          <div className="flex items-center gap-3 flex-wrap">
            <p className="text-gray-600 font-medium"> {profileData.degree} - {profileData.speciality}</p>

            <span className="px-3 py-1 text-sm bg-cyan-100 text-cyan-700 rounded-full"> {profileData.experience} </span>
          </div>

          {/* About */}
          <div>
            <p className="font-semibold text-cyan-700 mb-1"> About </p>
            <p className="text-gray-600 leading-relaxed">  {profileData.about}</p>
          </div>

          {/* Fee */}
          <p className="text-lg font-semibold text-gray-700">
            Appointment Fee:
            <span className="text-cyan-600 ml-2"> {currency}{isEdit ? <input type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: Number(e.target.value) }))} value={profileData.fees} /> : profileData.fees} </span>
          </p>

          {/* Address */}
          <div>
            <p className="font-semibold text-cyan-700 mb-1"> Address </p>

            <p className="text-gray-600">
              {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address?.line1}<br />
              {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address?.line2}
            </p>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2">
            <input onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} type="checkbox" checked={profileData.available} className="w-4 h-4 accent-cyan-500" />
            <label className="text-gray-700 font-medium"> Available</label>
          </div>
          {
            isEdit
              ? <button onClick={updateProfile} className="mt-3 px-5 py-2 bg-cyan-500 cursor-pointer text-white rounded-lg hover:bg-cyan-600 transition shadow" >
                Save
              </button>
              : <button onClick={() => setIsEdit(true)} className="mt-3 px-5 py-2 bg-cyan-500 cursor-pointer text-white rounded-lg hover:bg-cyan-600 transition shadow" >
                Edit Profile
              </button>
          }
        </div>
      </div>
    </div>
  )
}
export default DoctorProfile;
