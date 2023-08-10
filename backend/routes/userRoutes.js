import express, { json } from 'express'
import { helloController } from '../controllers/testController.js'
import { uploadPhoto } from '../controllers/uploadImageController.js'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger/swagger.json' assert { type: 'json' }

const router = express.Router()

router.get('/hello', helloController)
router.post('/upload', uploadPhoto)

router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default router
