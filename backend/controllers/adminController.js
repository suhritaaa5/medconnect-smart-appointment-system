import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'

//api for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        //checking data
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing detail" })
        }
        //email validation
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (!imageFile) {
            return res.json({ success: false, message: "Image is required" })
        }
        //password strong or not
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }
        //hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()

        }

        const newDoctor = new doctorModel(doctorData)
        const savedDoctor = await newDoctor.save()
        console.log("SAVED DOCTOR:", savedDoctor)
        res.json({ success: true, message: "Doctor Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// admin login api
const loginAdmin = async (req, res) => {

    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" })
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Inavlid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//api to get all docs list from admin panel
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//api to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({}).sort({ date: -1 })

        
        res.json({ success: true, appointments })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// Admin cancels appointment + releases slot (SAFE)
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body

    //  Find appointment
    const appointmentData = await appointmentModel.findById(appointmentId)
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" })
    }

    // If already cancelled
    if (appointmentData.cancelled) {
      return res.json({ success: false, message: "Appointment already cancelled" })
    }

    //  If paid block cancel
    if (appointmentData.payment) {
      return res.json({ success: false, message: "Paid appointment cannot be cancelled without refund" })
    }

    // Mark cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

    // Release slot atomically using $pull
    const { docId, slotDate, slotTime } = appointmentData

    await doctorModel.updateOne(
      { _id: docId },
      { $pull: { [`slots_booked.${slotDate}`]: slotTime } }
    )

    return res.json({ success: true, message: "Appointment Cancelled" })
  } catch (error) {
    console.log(error)
    return res.json({ success: false, message: error.message })
  }
}

//api to get dashboard data for admin
const adminDashboard = async(req,res)=>{
    try {
        const doctors =await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})
        const latestAppointments = await appointmentModel.find({}).sort({ date: -1 }).limit(5)


        const dashData ={
            doctors:doctors.length,
            appointments:appointments.length,
            patients:users.length,
            latestAppointments
        }
        res.json({success:true,dashData})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin ,appointmentCancel,adminDashboard} 