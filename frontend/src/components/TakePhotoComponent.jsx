import React, { useState } from 'react'

const TakePhotoComponent = () => {
    const [photos, setPhotos] = useState([])

    const convert = (myFile) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            if (fileReader && myFile) {
                fileReader.readAsDataURL(myFile)
                fileReader.onload = () => {
                    const base64data = fileReader.result
                    resolve(base64data)
                }

                fileReader.onerror = (error) => {
                    reject(error)
                }
            } else {
                reject('No file provided')
            }
        })
    }

    const upload = () => {
        return new Promise(async (resolve, reject) => {
            const filePicker = document.querySelector('input')

            if (
                !filePicker ||
                !filePicker.files ||
                filePicker.files.length <= 0
            ) {
                reject('No file selected.')
                return
            }
            const myFile = filePicker.files[0]

            try {
                const myBase64String = await convert(myFile)
                console.log('akash---', myBase64String)

                setPhotos((prevPhotos) => [...prevPhotos, myBase64String])

                resolve()
            } catch (error) {
                console.error(error)
                reject(error)
            }
        })
    }

    return (
        <div>
            <div>Click the upload icon below to upload a file.</div>

            <div className="container">
                <div className="image-upload">
                    {/*<label htmlFor="file-input">*/}
                    {/*    <img*/}
                    {/*        src="https://img.icons8.com/color/search/add"*/}
                    {/*        alt="Upload"*/}
                    {/*    />*/}
                    {/*</label>*/}

                    <input
                        id="file-input"
                        type="file"
                        accept="image/x-png,image/jpeg,image/jpg,image/png"
                        onChange={upload}
                    />
                </div>
            </div>

            {photos.map((item, index) => (
                <div className="gallery" key={index}>
                    <img src={item} alt={`Uploaded ${index}`} />
                </div>
            ))}
        </div>
    )
}

export default TakePhotoComponent
