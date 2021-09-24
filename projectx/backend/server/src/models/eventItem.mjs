import mongoose from 'mongoose'

const Schema = mongoose.Schema

const eventItemSchema = new Schema(
    {
        activityName: {
            type: String,
            required: true,
        },
        activityImageUrl: {
            type: String,
            required: false,
        },
        activityDate: {
            type: Date,
            required: true,
        },
        participantsList: {
            type: [String],
            required: false
        },
        activityOwner: {
            type: String,
            required: true,
        },
        activityDescription: {
            type: String,
            required: false,
        },
        activityLocation: {
            type: String,
            required: false,
        },
        activityUrl: {
            type: String,
            required: false,
        },
        activityImageList: {
            type: Schema.Types.ObjectId,
            ref: 'activityImageList',
            required: false,
        },
        familyMemberList: {
            type: Schema.Types.ObjectId,
            ref: 'FamilyMemberList',
            required: true,
        },
        comments: {
            type: [Schema.Types.ObjectId],
            ref: 'comment',
            required: false,
        }

    },
    { timestamps: true }
)

export default mongoose.model('eventItem', eventItemSchema, 'eventItem')