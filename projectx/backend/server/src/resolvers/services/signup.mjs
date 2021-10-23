import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import gravatar from '../../gravatar.mjs'
import dotenv from 'dotenv'

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY

const caster = id => mongoose.Types.ObjectId(id)

const signUp = async (args, User) => {
    
    const { email, password, username } = args
    
    const userEmail = email.trim().toLowerCase()
    const hashed = await bcrypt.hash(password, 10)
    const avatar = gravatar(email)

    try {
        const user = new User({
            userEmail,
            password: hashed,
            userName: username,
            avatarUrl: avatar,
        })
        const newUser = await user.save()
        const token = jwt.sign({
            id: newUser._id,
        },
        SECRET_KEY,
        )
        return token
    } catch (e) {
        console.log(`Error creating User -> ${e}`)
        throw e
    }
}

export default signUp