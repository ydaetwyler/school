import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        userEmail: {
            type: String,
            required: true,
            unique: true,
        },
        userName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        avatarUrl: {
            type: String,
            required: false,
        },
        avatarList: {
            type: Schema.Types.ObjectId,
            ref: 'avatarList',
            required: true,
        }
    },
    { timestamps: true }
)

export default mongoose.model('user', userSchema, 'user')