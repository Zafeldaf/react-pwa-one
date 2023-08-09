import express from 'express'
import { helloController } from '../controllers/testController.js'

const router = express.Router()

router.get('/hello', helloController)
router.get('/upload-photo')

export default router
