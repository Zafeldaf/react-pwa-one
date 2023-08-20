import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendEmail from '../services/ses.js'

const userController = {
    registerUser: async (req, res) => {
        const { firstName, lastName, email, password } = req.body

        try {
            const findUser = await User.findOne({ email })
            if (findUser) {
                return res.status(400).json({ message: 'User already exists' })
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const emailVerificationToken = jwt.sign(
                { email },
                process.env.JWT_TOKEN,
                { expiresIn: '1d' }
            )

            const newUser = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                emailVerificationToken,
            })

            await newUser.save()

            const emailVerificationLink = `${process.env.FRONTEND_URL}/verify?token=${emailVerificationToken}`
            const emailSubject = 'Email Verification'
            const emailText = `Please click the following link to verify your email: ${emailVerificationLink}`
            const emailHtml = `<p>Please click the following link to verify your email: <a href='${emailVerificationLink}'>${emailVerificationLink}</a></p>`

            const verificationEmail = await sendEmail(
                email,
                emailSubject,
                emailText,
                emailHtml
            )

            res.status(201).json({ message: 'User registered successfully' })
        } catch (e) {
            console.log('Error', e)
        }
    },
    loginUser: async (req, res) => {
        const { email, password } = req.body

        try {
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(401).json({ message: 'User not found' })
            }

            const matchPassword = await bcrypt.compare(password, user.password)
            if (!matchPassword) {
                return res.status(401).json({ message: 'Incorrect password' })
            }

            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_TOKEN,
                { expiresIn: '30d' }
            )

            res.status(200).json({ message: 'Login successful', token })
        } catch (error) {
            console.error('Login error:', error)
            res.status(500).json({ message: 'Login failed' })
        }
    },
    verifyEmail: async (req, res) => {
        const { token } = req.body

        try {
            const decoded = jwt.verify(token, process.env.JWT_TOKEN)
            const email = decoded.email

            await User.updateOne({ email }, { $set: { isVerified: true } })

            res.status(200).json({ message: 'Email verified successfully' })
        } catch (e) {
            console.error('Verification error:', e)
            res.status(400).json({ message: 'Verification failed' })
        }
    },
}

export default userController
