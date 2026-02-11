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
app.use(cors())

//api endpoints
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
//localhost:4000/api/admin/add-doctor

app.get("/check-doctors", async (req, res) => {
  const doctors = await doctorModel.find()
  res.json(doctors)
})


//ap endpoint
app.get('/',(req,res)=>{
    res.send('API WORKING ')
})

app.listen(port,()=>console.log("server started",port))