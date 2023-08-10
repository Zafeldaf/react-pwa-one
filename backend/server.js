import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import connectDB from './services/db.js'
import userRoutes from './routes/userRoutes.js'

const port = process.env.PORT || 6000

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(fileUpload({}))

app.use('/api', userRoutes)

app.listen(port, () => console.log(`Server started on port ${port}`))
