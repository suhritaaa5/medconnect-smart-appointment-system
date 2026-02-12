import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudiary from './config/cloudinary.js'
import adminRouter from './routes/adminroute.js'
import doctorModel from './models/doctorModel.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
//app config
const app= express()
const port = process.env.PORT || 4000
connectDB()
connectCloudiary()
//middlewares
app.use(express.json())
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
].filter(Boolean)

app.use(cors({
  origin: (origin, cb) => {
    // allow requests with no origin (Postman, curl, mobile apps)
    if (!origin) return cb(null, true)

    if (allowedOrigins.includes(origin)) return cb(null, true)

    return cb(new Error(`CORS blocked: ${origin}`))
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "token", "atoken", "dToken"],
}))

//api endpoints
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
//localhost:4000/api/admin/add-doctor

if (process.env.NODE_ENV !== "production") {
  app.get("/check-doctors", async (req, res) => {
    const doctors = await doctorModel.find()
    res.json(doctors)
  })
}


//ap endpoint
app.get('/',(req,res)=>{
    res.send('API WORKING ')
})
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ success: false, message: err.message })
})
app.listen(port,()=>console.log("server started",port))