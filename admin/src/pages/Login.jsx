import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const{setAToken,backendUrl}=useContext(AdminContext)
  const{setDToken}=useContext(DoctorContext)

  const onSubmitHandler = async(event)=>{
    event.preventDefault()
    try{
        if (state ==='Admin'){
            const{data}=await axios.post(backendUrl+'/api/admin/login',{email,password})
            if(data.success){
                localStorage.setItem('aToken',data.token)
                setAToken(data.token)
            }else{
                toast.error(data.message)
            }
        }else{
          const{data}=await axios.post(backendUrl+'/api/doctor/login',{email,password})
          if(data.success){
            localStorage.setItem('dToken',data.token)
            setDToken(data.token)   
            console.log(data.token)    
          }else{
            toast.error(data.message)
          }

        }
    }catch (error){

    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-grey-100">
    <form onSubmit={onSubmitHandler} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <div className="text-center mb-6">
          <p className="text-2xl font-semibold m-auto">
            <span className="text-primary">{state}</span> Login
          </p>
        </div>

   
        <div className="mb-4">
          <p className="text-sm font-medium mb-1">Email</p>
          <input onChange={(e) => setEmail(e.target.value)} type="email" value={email}  required  placeholder="Enter your email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
        </div>
      
        <div className="mb-6">
          <p className="text-sm font-medium mb-1">Password</p>
          <input  onChange={(e) => setPassword(e.target.value)} type="password" value={password} required placeholder="Enter your password"className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <button type="submit" className="w-full bg-cyan-600 text-white py-2 rounded-lg font-semibold hover:bg-cyan-700 transition duration-200" > Login</button>
        {
            state==='Admin'
            ?<p> Doctor Login?<span className='text-primary underline cursor-pointer ml-2' onClick={()=>setState('Doctor')}>Click Here </span></p>
            :<p> Admin Login? <span className='text-primary underline cursor-pointer ml-2' onClick={()=>setState('Admin')}>Click Here </span></p>
        }

      </form>
    </div>
  )
}

export default Login
