import React from 'react'
import './App.css'
import Button from '@mui/material/Button'

const App = () => {
    const handleSignout = () => {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }

    return (
        <Button onClick={handleSignout} variant="outlined" color="secondary">
            Sign Out
        </Button>
    )
}

export default App
