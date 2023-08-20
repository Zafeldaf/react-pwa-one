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
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())
    .use(fileUpload({}))
    .use('/api', userRoutes)

app.listen(port, () => console.log(`Server started on port ${port}`))
