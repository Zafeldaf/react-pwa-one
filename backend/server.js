import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'

dotenv.config()

const port = process.env.PORT || 2000
const app = express()

app.use(cors())
app.use('/api', userRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
