import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import UploadPhoto from './components/UploadPhoto'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/chat',
        element: <UploadPhoto />,
    },
])

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<RouterProvider router={router} />)
