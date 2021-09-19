import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema(
    {
        commentText: {
            type: String,
            required: true,
        },
        commentOwner: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

export default mongoose.model('comment', commentSchema, 'comment')