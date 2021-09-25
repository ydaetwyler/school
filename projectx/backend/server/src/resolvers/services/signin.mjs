import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY

const caster = id => mongoose.Types.ObjectId(id)

const signIn = async (args, User) => {
    
    const { userEmail, userPassword } = args.user

    if (userEmail) {
        userEmail = userEmail.trim().toLowerCase()
    }

    const userFetched = await User.findOne({ email: email })
    if (!userFeteched) {
        throw new Error('Error signing in')
    }
    
    const match = await bcrypt.compare(password, userFetched.password)
    if (!match) {
        throw new Error('Error signing in')
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