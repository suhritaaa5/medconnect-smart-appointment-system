import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)
      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Profile update failed')


    }

  }
  return userData && (
    <div className="px-6 md:px-20 py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">
          My <span className="text-cyan-600">Profile</span>
        </h2>

        <div className="max-w-2xl mx-auto bg-white border border-gray-200 shadow-sm rounded-2xl p-8 md:p-10">

          <div className="flex items-center gap-4">
            {
              isEdit ? (
                <label className="cursor-pointer">
                  <img src={image ? URL.createObjectURL(image) : userData.image} alt=""
                    className="w-24 h-24 rounded-full border object-cover" />
                  <input type="file" hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                  <p className="text-xs text-gray-500 mt-1">Change photo</p>
                </label>) :
                (<img src={userData.image} alt=""
                  className="w-24 h-24 rounded-full border object-cover" />)
            }
            {
              isEdit
                ? <input type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                  className="border px-3 py-1 rounded" />
                : <p className="text-xl font-semibold">{userData.name}</p>
            }
          </div>
          <hr className="my-6" />
          <div>
            <p className="font-semibold mb-3">CONTACT INFORMATION</p>

            <p className="text-sm text-gray-600">Email id:</p>
            <p className="mb-3">{userData.email}</p>

            <p className="text-sm text-gray-600">Phone</p>
            {
              isEdit
                ? <input
                  type="text"
                  value={userData.phone}
                  onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                  className="border px-3 py-1 rounded mb-3"
                />
                : <p className="mb-3">{userData.phone}</p>
            }

            <p className="text-sm text-gray-600">Address:</p>
            {
              isEdit
                ? <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={userData.address.line1}
                    onChange={e => setUserData(prev => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value }
                    }))}
                    className="border px-3 py-1 rounded"
                  />
                  <input
                    type="text"
                    value={userData.address.line2}
                    onChange={e => setUserData(prev => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value }
                    }))}
                    className="border px-3 py-1 rounded"
                  />
                </div>
                : <p className="text-gray-700">
                  {userData.address.line1}<br />
                  {userData.address.line2}
                </p>
            }
          </div>

          <div className="mt-6">
            <p className="font-semibold mb-3">BASIC INFORMATION</p>

            <p className="text-sm text-gray-600">Gender:</p>
            {
              isEdit
                ? <select
                  value={userData.gender}
                  onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                  className="border px-3 py-1 rounded mb-3"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
                : <p className="mb-3">{userData.gender}</p>
            }

            <p className="text-sm text-gray-600">Birthday</p>
            {
              isEdit
                ? <input
                  type="date"
                  value={userData.dob}
                  onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                  className="border px-3 py-1 rounded"
                />
                : <p>{userData.dob}</p>
            }
          </div>

          <div className="mt-8 text-right">
            {
              isEdit
                ? <button
                  onClick={updateUserProfileData}
                  className="bg-sky-600 text-white px-6 py-2 rounded-full hover:bg-sky-700"
                >
                  Save Information
                </button>
                : <button
                  onClick={() => setIsEdit(true)}
                  className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-900"
                >
                  Edit
                </button>

            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default MyProfile
