import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY

const caster = id => mongoose.Types.ObjectId(id)

const signIn = async (args, User) => {
    
    const { email, password } = args
    const userPassword = password
    let userEmail

    if (email) {
        userEmail = email.trim().toLowerCase()
    }

    const userFetched = await User.findOne({ userEmail })
    if (!userFetched) {
        throw new Error('Error signing in')
    }
    
    const match = await bcrypt.compare(userPassword, userFetched.password)
    if (!match) {
        throw new Error('Error signing in, wrong password')
    } else {
        const token = jwt.sign({
            id: userFetched._id,
        },
        SECRET_KEY,
        )
        return token
    }
}

export default signIn