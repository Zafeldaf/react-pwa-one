import { uploadToS3 } from '../services/bucket.js'
import Photo from '../models/photoModel.js'
import { v4 as uuidv4 } from 'uuid'

export const uploadPhoto = async (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).json({ error: 'No file uploaded' })
    }

    try {
        const file = req.files.file
        const fileKey = uuidv4() + '-img.png'
        const url = await uploadToS3(file, fileKey)

        const photo = new Photo({
            title: req.body.title,
            imageUrl: url,
        })

        const savedPhoto = await photo.save()

        res.json({ message: 'File uploaded successfully', image: savedPhoto })
    } catch (error) {
        console.error('Error uploading file:', error)
        res.status(500).json({
            error: 'Failed to upload file or save to the database',
        })
    }
}
