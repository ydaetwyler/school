import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        userEmail: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        avatarUrl: {
            type: String
        },
    }
)

export default mongoose.model('user', userSchema, 'user')