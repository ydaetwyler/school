import mongoose from 'mongoose'

const Schema = mongoose.Schema

const familySchema = new Schema(
    {
        familyName: {
            type: String,
            required: true,
        },
        familyMemberNames: {
            type: [String],
            required: false,
        },
        familyMemberHash: {
            type: [String],
            required: false,
        },
        eventList: {
            type: [Schema.Types.ObjectId],
            ref: 'eventItem',
            required: false,
        },
        collectionList: {
            type: [Schema.Types.ObjectId],
            ref: 'CollectionList',
            required: false,
        },
        hash: {
            type: String,
            required: true, 
        } 
    },
    { timestamps: true }
)

export default mongoose.model('family', familySchema, 'family')