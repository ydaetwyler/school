import { AuthenticationError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import User from '../models/user.mjs'

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

const validateUser = token => {
    if (token) {
        try {
            return jwt.verify(token, SECRET_KEY)
        } catch(e) {
            throw new AuthenticationError('Session invalid')
        }
    }
}

const Auth = async ({ req }) => {
    try {
        const token = req.cookies.userToken

        if (!token) return { isAuth: false }

        const user = validateUser(token)

        const userExists = await User.findById({_id: user.id})

        if (userExists) {
            return { isAuth: true, userId: user.id }
        }
    } catch(e) {
        console.log(`error auth -> ${e}`)
    }
}

export default Auth