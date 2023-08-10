import mongoose from 'mongoose'

const photoSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        imageUrl: { type: String, required: true },
    },
    { collection: 'photos' },
    {
        timestamps: true,
    }
)

const Photo = mongoose.model('photos', photoSchema)

export default Photo
