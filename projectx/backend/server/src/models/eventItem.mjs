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
            required: false,
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
            type: String,
            required: false,
        },
        activityOwner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        participantsList: {
            type: [Schema.Types.ObjectId],
            ref: 'user',
            required: false
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