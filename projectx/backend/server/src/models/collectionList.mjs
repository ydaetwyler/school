import mongoose from 'mongoose'

const Schema = mongoose.Schema

const collectionListSchema = new Schema(
    {
        collectionName: {
            type: String,
            required: true
        },
        collectionIconUrl: {
            type: String
        }
    },
    { timestamps: true }
)

export default mongoose.model('collectionList', collectionListSchema, 'collectionList')