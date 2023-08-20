import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const EmailVerification = () => {
    const [verificationStatus, setVerificationStatus] = useState('verifying')
    const location = useLocation()

    useEffect(() => {
        const token = new URLSearchParams(location.search).get('token')
        if (token) {
            axios
                .post('/api/verify-email', { token })
                .then((response) => {
                    setVerificationStatus('verified')
                })
                .catch((error) => {
                    setVerificationStatus('failed')
                })
        } else {
            setVerificationStatus('invalid')
        }
    }, [location.search])

    return (
        <>
            <div>
                {verificationStatus === 'verifying' && (
                    <p>Verifying email...</p>
                )}
                {verificationStatus === 'verified' && (
                    <p>Email verified successfully!</p>
                )}
                {verificationStatus === 'failed' && (
                    <p>Verification failed. Please try again.</p>
                )}
                {verificationStatus === 'invalid' && (
                    <p>Invalid verification link.</p>
                )}
            </div>
        </>
    )
}

export default EmailVerification
