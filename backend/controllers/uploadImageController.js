import { createBucketInstance } from '../services/bucket.js'

const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: 'mern-app-files',
            Key: file.name,
            Body: file.data,
            ACL: 'public-read',
        }

        console.log(params)

        const bucketInstance = createBucketInstance()

        bucketInstance.upload(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

export default uploadImage
