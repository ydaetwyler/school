import mongoose from 'mongoose'

const Schema = mongoose.Schema

const familySchema = new Schema(
    {
        familyName: {
            type: String,
            required: true,
        },
        familyMemberList: {
            type: Schema.Types.ObjectId,
            ref: 'familyMemberList',
            required: true,
        },
        eventList: {
            type: [Schema.Types.ObjectId],
            ref: 'eventItem',
            required: true,
        },
        collectionList: {
            type: Schema.Types.ObjectId,
            ref: 'CollectionList',
            required: true,
        }
    },
    { timestamps: true }
)

export default mongoose.model('family', familySchema, 'family')