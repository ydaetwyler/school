import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { nanoid } from 'nanoid'

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY

const caster = id => mongoose.Types.ObjectId(id)

const signUp = async (args, User, Family) => {
    
    const { email, password, username, familyHash, avatarUrl } = args
    
    const userEmail = email.trim().toLowerCase()
    const hashed = await bcrypt.hash(password, 10)
    const userHash = nanoid()

    try {
        const user = new User({
            userEmail,
            password: hashed,
            userName: username,
            familyHash,
            hash: userHash,
            avatarUrl,
        })
        const newUser = await user.save()
        const token = jwt.sign({
            id: newUser._id,
        },
        SECRET_KEY,
        )

        let updateFamily = await Family.findOne({ hash: familyHash })

        updateFamily.familyMemberNames.push(username)
        updateFamily.familyMemberHash.push(userHash)

        await updateFamily.save()
        
        return token
    } catch (e) {
        console.log(`Error creating User -> ${e}`)
        throw e
    }
}

export default signUp