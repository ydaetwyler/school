import mongoose from 'mongoose'

const Schema = mongoose.Schema

const familySchema = new Schema(
    {
        familyName: {
            type: String,
            required: true,
        },
    }
)

export default mongoose.model('family', familySchema, 'family')