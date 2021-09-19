import mongoose from 'mongoose'

const Schema = mongoose.Schema

const eventItemSchema = new Schema(
    {
        activityName: {
            type: String,
            required: true,
        },
        activityImageUrl: {
            type: String
        },
        activityDate: {
            type: Date,
            required: true,
        },
        activityOwner: {
            type: String,
            required: true,
        },
        activityDescription: {
            type: String,
        },
        activityLocation: {
            type: String,
        },
        activityUrl: {
            type: String,
        },
    },
    { timestamps: true }
)

export default mongoose.model('eventItem', eventItemSchema, 'eventItem')