import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Input from '@mui/material/Input'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Register() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleRegister = async (event) => {
        event.preventDefault()

        const token = localStorage.getItem('token')
        if (token) {
            toast.info('User is logged in. Log out to created a new user')
            setTimeout(() => {
                window.location.href = '/'
            }, 1000)
        } else {
            if (password !== confirmPassword) {
                return toast.error("Passwords don't match")
            }

            if (password.length < 8) {
                return toast.error(
                    'Password should at least be 8 characters long'
                )
            }

            if (
                !firstName ||
                !lastName ||
                !email ||
                !password ||
                !confirmPassword
            ) {
                toast.error('You have to fill in all the forms.')
            }
            const registrationData = {
                firstName,
                lastName,
                email,
                password,
            }

            try {
                const response = await axios.post(
                    '/api/register',
                    registrationData
                )
                console.log(response.data)
                toast.success('Registration successful!')

                window.location.href = '/login'
            } catch (error) {
                console.error('Registration failed:', error)
                toast.error('Registration failed. Please try again later.')
            }
        }
    }

    const toLogin = () => {
        window.location.href = '/login'
    }

    return (
        <CssBaseline>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        background: `url('https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2') center/cover no-repeat`,
                        height: '100vh',
                    }}
                ></Box>

                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: '400px',
                            px: 2,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginBottom: '-1rem',
                            }}
                        >
                            <Button variant="outlined" onClick={toLogin}>
                                Log In
                            </Button>
                        </Box>
                        <Box
                            component="header"
                            sx={{
                                py: 3,
                                textAlign: 'center',
                            }}
                        >
                            <Typography fontWeight="bold" variant="h5">
                                Register
                            </Typography>
                        </Box>

                        <Box
                            component="main"
                            sx={{
                                py: 2,
                                pb: 5,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                '& form': {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                },
                            }}
                        >
                            <form onSubmit={handleRegister}>
                                <FormControl>
                                    <FormLabel>First Name</FormLabel>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input
                                        type="text"
                                        name="lastName"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <Input
                                        type="password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                    />
                                </FormControl>
                                <Button type="submit" fullWidth>
                                    Register
                                </Button>
                            </form>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <ToastContainer position="top-right" autoClose={5000} />
        </CssBaseline>
    )
}
