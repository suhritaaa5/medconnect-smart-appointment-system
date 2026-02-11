import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const {backendUrl,token,setToken}=useContext(AppContext)
  const [state, setState] = useState('Sign Up')
  const navigate= useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')


  const onSubmitHandler = async (event) => {
    event.preventDefault()
   try{
    if(state === 'Sign Up'){
      const{data}= await axios.post(backendUrl+'/api/user/register',{name,password,email})
      if(data.success){
        localStorage.setItem('token',data.token)
        setToken(data.token)

      }else{
        toast.error(data.message)
      }
    }else{
      const{data}= await axios.post(backendUrl+'/api/user/login',{password,email})
      if(data.success){
        localStorage.setItem('token',data.token)
        setToken(data.token)
        toast.success("Logged in")
       


      }else{
        toast.error(data.message)
      }

    }
   }catch(error){
    toast.error(error.message)
   }
  }
useEffect(()=>{
  if(token){
    navigate('/')

  }
},[token])
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <form onSubmit={onSubmitHandler} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center">{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
        <p className="text-center text-gray-500 mb-6"> Please {state === 'Sign Up' ? 'create an account' : 'login'} to book appointment</p>
        {state === 'Sign Up' && (<div className="mb-4"> 
          <label className="block mb-1 font-medium">Full Name</label>
            <input type="text"  value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" required
            />
          </div>)}

        <div className="mb-4"><label className="block mb-1 font-medium">Email</label> <input type="email"value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"required/>
        </div>

        <div className="mb-6"> <label className="block mb-1 font-medium">Password</label> 
        <input  type="password"  value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"required />
        </div>
        <button 
          type="submit"className="w-full bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700 transition" >{state}
        </button>

        <p className="mt-4 text-center text-gray-500">{state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span  onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}  className="text-cyan-600 font-medium cursor-pointer hover:underline" >
            {state === 'Sign Up' ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login
