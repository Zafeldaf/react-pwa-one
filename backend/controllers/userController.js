import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userController = {
    registerUser: async (req, res) => {
        const { firstName, lastName, email, password } = req.body

        try {
            const findUser = await User.findOne({ email })
            if (findUser) {
                return res.status(400).json({ message: 'User already exists' })
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            })

            await newUser.save()

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
}

export default userController
