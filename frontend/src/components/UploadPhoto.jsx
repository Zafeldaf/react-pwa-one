import React, { useState } from 'react'
import axios from 'axios'

function App() {
    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleFileUpload = async () => {
        if (selectedFile) {
            const formData = new FormData()
            formData.append('file', selectedFile)

            try {
                await axios.post('http://localhost:2000/api/upload', formData)
                console.log('File uploaded successfully')
            } catch (error) {
                console.error('Error uploading file', error)
            }
        }
    }

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload File</button>
        </div>
    )
}

export default App
