import React from 'react'
import './App.css'
import UploadPhoto from './components/UploadPhoto'

const App = () => {
    return (
        <>
            <div className="header">
                <h1>PWA</h1>
            </div>
            <UploadPhoto />
        </>
    )
}

export default App
