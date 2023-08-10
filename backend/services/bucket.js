import aws from 'aws-sdk'

export const createBucketInstance = () => {
    return new aws.S3({
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
        region: process.env.AWS_REGION,
        apiVersion: '2006-03-01',
    })
}
