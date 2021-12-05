import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import Family from '../models/family.mjs'
import User from '../models/user.mjs'

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

const validateUser = token => {
    if (token) {
        try {
            return jwt.verify(token, SECRET_KEY)
        } catch(e) {
            throw new Error('Session invalid')
        }
    }
}

const Auth = async ({ req }) => {
    try {
        const token = req.cookies.userToken

        if (!token) return { isAuth: false }

        const userId = validateUser(token)

        if (userId) {
            return { isAuth: true, userId }
        }
    } catch(e) {
        console.log(`error auth -> ${e}`)
    }
}

export default Auth