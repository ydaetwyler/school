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
    const token = req.headers.authorization

    if (!token) return { isAuth: false }

    const userId = validateUser(token)

    try {
        const user = await User.findOne({ id: userId })

        const checkUserHash = user.hash

        const familyHash = user.familyHash

        const family = await Family.findOne({ hash: familyHash })

        const checkFamilyHash = family.hash

        if (userId) {
            return { isAuth: true, userId, checkUserHash, checkFamilyHash }
        }
    } catch(e) {
        console.log(`error auth -> ${e}`)
    }
}

export default Auth