import mongoose from 'mongoose'

const Schema = mongoose.Schema

const familyMemberListSchema = new Schema(
    {
        user: {
            type: [Schema.Types.ObjectId],
            ref: 'user',
            required: true,
        }
    },
    { timestamps: true }
)

export default mongoose.model('familyMemberList', familyMemberListSchema, 'familyMemberList')