import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger/swagger.json' assert { type: 'json' }

const port = process.env.PORT || 2000
const app = express()

app.use(cors())
app.use(fileUpload())
app.use('/api', userRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
