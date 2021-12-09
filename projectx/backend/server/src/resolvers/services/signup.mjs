import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { nanoid } from 'nanoid'

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY

const signUp = async (args, User) => {
    
    const { email, password, username, userHash, avatarUrl } = args
    
    const userEmail = email.trim().toLowerCase()
    const hashed = await bcrypt.hash(password, 10)

    try {
        const overwriteHash = nanoid()

        await User.findOneAndUpdate({ hash: userHash }, {
            userEmail: userEmail,
            password: hashed,
            userName: username,
            hash: overwriteHash
        })

        const user = await User.findOne({ hash: overwriteHash })

        console.log(user.id)
        
        const token = jwt.sign({
            id: user._id,
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