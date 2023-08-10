import express from 'express'
import { helloController } from '../controllers/testController.js'
import uploadImage from '../controllers/uploadImageController.js'

const router = express.Router()

router.get('/hello', helloController)
router.post('/upload', async (req, res) => {
    try {
        console.log(req.files)
        const file = req.files.file

        if (!file) {
            return res.status(400).send('No file uploaded.')
        }

        const uploadedFile = await uploadImage(file)
        console.log('File uploaded to S3', uploadedFile)
        return res.status(200).send('File uploaded to S3.')
    } catch (error) {
        console.error('Error uploading file', error)
        return res.status(500).send('Error uploading file.')
    }
})

export default router
