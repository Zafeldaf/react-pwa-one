const UploadPhoto = () => {
    return (
        <div>
            <div>Click the upload icon below to upload a file.</div>

            <div className="container">
                <div className="image-upload">
                    <input
                        id="file-input"
                        type="file"
                        accept="image/x-png,image/jpeg,image/jpg,image/png"
                    />
                </div>
            </div>
        </div>
    )
}

export default UploadPhoto
