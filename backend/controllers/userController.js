import isEmail from 'validator/lib/isEmail.js'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import Razorpay from 'razorpay'
//api to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !password || !email) {
            return res.json({ success: false, message: 'Missing Detaiils' })
        }
        if (!isEmail(email)) {
            return res.json({ success: false, message: 'Enter a valid Email' })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: 'enter a strong password' })
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const userData = {
            name,
            email,
            password: hashedPassword,

        }
        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'user does not exist' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            return res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//api to get user profile data
const getProfile = async (req, res) => {
    try {
        const userData = await userModel
            .findById(req.userId)
            .select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//api to update user profile
const updateProfile = async (req, res) => {
    try {
        const { name, phone, address, dob, gender } = req.body
        const userId = req.userId
        const imageFile = req.file
        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: 'Data Missig' })
        }
        let parsedAddress = address
        if (typeof address === 'string') { parsedAddress = JSON.parse(address) }
        // DOB validation 
        const dobDate = new Date(dob)
        const today = new Date()

        if (Number.isNaN(dobDate.getTime())) {
            return res.json({ success: false, message: "Invalid DOB format" })
        }

        if (dobDate > today) {
            return res.json({ success: false, message: "Invalid DOB" })
        }

        // Optional realistic limit
        const age = today.getFullYear() - dobDate.getFullYear()
        if (age < 0 || age > 120) {
            return res.json({ success: false, message: "Invalid DOB" })
        }
        await userModel.findByIdAndUpdate(userId, { name, phone, address: parsedAddress, dob, gender })
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageURL = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }
        res.json({ success: true, message: "Profile Updated" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }


}


//api to book appointment (SAFE ATOMIC)
const bookAppointment = async (req, res) => {
    try {
        const userId = req.userId
        const { docId, slotDate, slotTime } = req.body

        const docData = await doctorModel.findById(docId).select('-password')
        if (!docData) return res.json({ success: false, message: 'Doctor not found' })

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor not available' })
        }
        const userData = await userModel.findById(userId).select('-password')
        const isProfileComplete =
            userData.phone &&
            userData.dob &&
            userData.gender &&
            userData.address?.line1 &&
            userData.address?.line2

        if (!isProfileComplete) {
            return res.json({
                success: false,
                message: "complete your profile to book an appointment"
            })
        }

        // ✅ Atomic: add slot only if not already present
        const updateResult = await doctorModel.updateOne(
            { _id: docId, [`slots_booked.${slotDate}`]: { $ne: slotTime } },
            { $addToSet: { [`slots_booked.${slotDate}`]: slotTime } }
        )

        if (updateResult.modifiedCount === 0) {
            return res.json({ success: false, message: 'Slot not available' })
        }


        // keep snapshot if you want
        const cleanDocData = { ...docData.toObject() }
        delete cleanDocData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData: cleanDocData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        await appointmentModel.create(appointmentData)

        return res.json({ success: true, message: 'Appointment Booked' })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}


//list user appointments
const listAppointment = async (req, res) => {
    try {
        const userId = req.userId
        const appointments = await appointmentModel.find({ userId }).sort({ date: -1 })

        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//api to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const userId = req.userId

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" })
        }

        if (appointmentData.userId.toString() !== userId.toString()) {
            return res.json({ success: false, message: "Unauthorized Action" })
        }
        if (appointmentData.cancelled) {
            return res.json({ success: false, message: "Already cancelled" })
        }


        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        await doctorModel.updateOne(
            { _id: appointmentData.docId },
            { $pull: { [`slots_booked.${appointmentData.slotDate}`]: appointmentData.slotTime } }
        )

        return res.json({ success: true, message: "Appointment Cancelled" })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

//api to make payment of razorpay
const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({
                success: false,
                message: "Appointment Cancelled or Not found",
            })
        }

        const options = {
            amount: appointmentData.amount * 100,
            currency: "INR",
            receipt: appointmentId,
        }

        const order = await razorpayInstance.orders.create(options)

        res.json({ success: true, order })
    } catch (error) {
        console.log("Razorpay error:", error)
        res.json({ success: false, message: error.message })
    }
}
//api to verify payment
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        console.log(orderInfo)
        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.json({ success: true, message: 'Payment Successful' })
        } else {
            res.json({ success: false, message: 'Payment Failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}
export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay }
