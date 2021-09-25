import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import gravatar from '../../gravatar'

const SECRET_KEY = process.env.SECRET_KEY

const caster = id => mongoose.Types.ObjectId(id)

const signUp = async (args, User) => {
    
    const { userEmail, userPassword, userName } = args.user
    
    email = userEmail.trim().toLowerCase()
    const hashed = await bcrypt.hash(userPassword, 10)
    const avatar = gravatar(email)

    try {
        const user = new User({
            email,
            pawword: hashed,
            userName,
            avatar,
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