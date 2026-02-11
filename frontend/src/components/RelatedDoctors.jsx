import React, { useContext, useState,useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality,docId}) => {
    const{doctors}=useContext(AppContext)
    const navigate =useNavigate()

    const[relDoc,setRelDoc]= useState([])
    useEffect(()=>{
        if (doctors.length >0 && speciality){
            const doctorsData =doctors.filter((doc)=>doc.speciality===speciality &&doc._id !==docId)
            setRelDoc(doctorsData)
        }
    },[doctors,speciality,docId])
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Related Doctors</h1>
     
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {relDoc.slice(0,5).map((item,index)=>(
          <div onClick={() => {navigate(`/appointment/${item._id}`);window.scrollTo(0, 0); }}className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"key={index}>
            <img className='bg-blue-50' src={item.image} alt=''/>
            <div className='p-4'>
             <div
                className={`flex items-center gap-2 text-sm text-center mb-2 ${item.available ? 'text-green-500' : 'text-gray-500'}`}
              >
                <span
                  className={`w-2 h-2 rounded-full  ${item.available ? 'bg-green-500' : 'bg-gray-500'}`}
                ></span>

                <span>{item.available ? 'Available' : 'Not Available'}</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
              <p className="text-sm text-gray-500">{item.speciality}</p>
            </div>
          </div>
        ))}

      </div>
      
    </div>
  )
}

export default RelatedDoctors
