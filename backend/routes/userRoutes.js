import express from 'express'
import { helloController } from '../controllers/testController.js'

const router = express.Router()

// Test Controller, may have other purposes
router.get('/hello', helloController)

export default router
