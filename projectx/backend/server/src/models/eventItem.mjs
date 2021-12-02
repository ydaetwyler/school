import mongoose from 'mongoose'

const Schema = mongoose.Schema

const eventItemSchema = new Schema(
    {
        hash: {
            type: String,
            required: true,
        },
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
        participantsList: {
            type: [String],
            required: false
        },
        activityOwner: {
            type: String,
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
            type: Schema.Types.ObjectId,
            ref: 'activityImageList',
            required: false,
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