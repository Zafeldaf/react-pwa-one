import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import App from './App'
import Login from './components/Login'
import Register from './components/Register'
import EmailVerification from './components/EmailVerification'

const PrivateRoute = ({ element }) => {
    const isAuthenticated = localStorage.getItem('token') !== null
    return isAuthenticated ? element : <Navigate to="/login" />
}

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Register />,
    },
    {
        path: '/verify',
        element: <EmailVerification />,
    },
    // Private Route
    {
        path: '/',
        element: <PrivateRoute element={<App />} />,
    },
])

const root = createRoot(document.getElementById('root'))
root.render(<RouterProvider router={router} />)
