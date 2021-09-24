import mongoose from 'mongoose'

const Schema = mongoose.Schema

const avatarListSchema = new Schema(
    {
        avatarUrl: {
            type: [String],
            required: false
        }
    },
    { timestamps: true }
)

export default mongoose.model('avatarList', avatarListSchema, 'avatarList')