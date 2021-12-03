import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

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

const Auth = ({ req }) => {
    const token = req.headers.authorization

    if (!token) return { isAuth: false }

    const userId = validateUser(token)

    if (userId) {
        return { isAuth: true, userId }
    }

}

export default Auth