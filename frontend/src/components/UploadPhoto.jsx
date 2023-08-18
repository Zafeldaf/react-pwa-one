import React, { useState } from 'react'
import FormContainer from './FormContainer.jsx'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import axios from 'axios'

const UploadPhoto = () => {
    const [file, setFile] = useState(null)

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleUpload = async () => {
        if (file) {
            try {
                const formData = new FormData()

                formData.append('title', document.getElementById('title').value)
                formData.append('file', file)

                await axios.post(`/api/upload`, formData)
                toast.success('File Uploaded')
            } catch (error) {
                toast.error('File Not Uploaded')
            }
        } else {
            toast.error('Please select a file to upload.')
        }
    }

    return (
        <div>
            <FormContainer>
                <h1>Upload Photo</h1>
                <Form>
                    <Form.Group className="my-2" controlId="title">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="text" name="title" />
                    </Form.Group>
                    <Form.Group className="my-2" controlId="body">
                        <Form.Label>Select Photo</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                    <Button
                        onClick={handleUpload}
                        type="button"
                        variant="primary"
                        className="my-2"
                    >
                        Upload
                    </Button>
                </Form>
            </FormContainer>
        </div>
    )
}

export default UploadPhoto
