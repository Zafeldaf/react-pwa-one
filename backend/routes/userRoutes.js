import express, { json } from 'express'
import { helloController } from '../controllers/testController.js'
import { uploadPhoto } from '../controllers/uploadImageController.js'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger/swagger.json' assert { type: 'json' }
import userController from '../controllers/userController.js'

const router = express.Router()

router.get('/hello', helloController)
router.post('/upload', uploadPhoto)

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/verify-email', userController.verifyEmail)

router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default router
