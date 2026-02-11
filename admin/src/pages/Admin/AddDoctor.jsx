import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')


  const {backendUrl,aToken}=useContext(AdminContext)

  const onSubmitHandler= async(event)=>{
    event.preventDefault()

    try{
      if(!docImg){
        return toast.error('Image not selected')
      }
      const formData =new FormData()
      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('fees',Number(fees))
      formData.append('about',about)
      formData.append('speciality',speciality)
      formData.append('degree',degree)
      formData.append('address',JSON.stringify({line1:address1,line2:address2}))


      //console log
      formData.forEach((value,key)=>{
        console.log(`${key}:${value}`)
      })

      const{data}= await axios.post(backendUrl + '/api/admin/add-doctor',formData,{headers:{aToken}})
      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error(error.message)
      console.log(error)
    }
  }
  return (
    
    <form onSubmit={onSubmitHandler} className="m-5 w-full bg-white p-6 rounded-xl shadow-sm">
      <p className="mb-6 text-xl font-semibold text-cyan-700">Add Doctor</p>

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-6">
          <label htmlFor="doc-img" className="cursor-pointer flex flex-col items-center gap-2" >
            <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt=""
              className=" bg-gray-100 w-32 h-32 object-contain cursor-pointer border-2 border-dashed border-gray-500 rounded-lg p-3 hover:border-cyan-600 transition" />
            <p className="text-sm text-gray-500 text-center">  Upload doctor <br /> picture </p>
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-1 text-sm font-medium">Doctor Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-cyan-600" />
            </div>

            <div>
              <p className="mb-1 text-sm font-medium">Doctor Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-cyan-600" />
            </div>

            <div>
              <p className="mb-1 text-sm font-medium">Doctor Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-cyan-600" />
            </div>

            <div>
              <p className="mb-1 text-sm font-medium">Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-cyan-600">
                <option>1 Year</option>
                <option>2 Years</option>
                <option>3 Years</option>
                <option>4 Years</option>
                <option>5 Years</option>
                <option>6 Years</option>
                <option>7 Years</option>
                <option>8 Years</option>
                <option>9 Years</option>
                <option>10 Years +</option>
              </select>
            </div>

            <div>
              <p className="mb-1 text-sm font-medium">Fees</p>
              <input onChange={(e)=>setFees(e.target.value)}value={fees} type="number" placeholder="Fees" required min="0"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-cyan-600" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-1 text-sm font-medium">Speciality</p>
              <select onChange={(e)=>setSpeciality(e.target.value)}value={speciality}className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-cyan-600">
                <option>General physician</option>
                <option>Gynecologist</option>
                <option>Dermatologist</option>
                <option>Pediatricians</option>
                <option>Neurologist</option>
                <option>Gastroenterologist</option>
              </select>
            </div>

            <div>
              <p className="mb-1 text-sm font-medium">Education</p>
              <input onChange={(e)=>setDegree(e.target.value)}value={degree}type="text" placeholder="Education" required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-cyan-600" />
            </div>

            <div>
              <p className="mb-1 text-sm font-medium">Address</p>
              <input onChange={(e)=>setAddress1(e.target.value)}value={address1}type="text" placeholder="Address line 1" required
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-cyan-600" />
              <input onChange={(e)=>setAddress2(e.target.value)}value={address2}type="text" placeholder="Address line 2" required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-cyan-600" />
            </div>

          </div>
        </div>

        <div>
          <p className="mb-1 text-sm font-medium">About</p>
          <textarea onChange={(e)=>setAbout(e.target.value)}value={about}placeholder="Write about doctor" rows={5} required
            className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:border-cyan-600" />
        </div>

        <button type="submit" className="w-fit bg-cyan-600 text-white px-6 py-2 rounded-md font-medium hover:bg-cyan-700 transition">Add Doctor</button>

      </div>
    </form>
  )
}

export default AddDoctor
