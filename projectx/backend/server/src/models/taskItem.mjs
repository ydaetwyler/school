import mongoose from 'mongoose'

const Schema = mongoose.Schema

const taskItemSchema = new Schema(
    {
        taskName: {
            type: String,
            required: true,
        },
        taskPriority: {
            type: String,
            required: true,
        },
        taskDescription: {
            type: String,
        },
        taskDue: {
            type: Date,
        },
        taskResponsibles: {
            type: [String]
        },
        taskKanban: {
            type: String,
            required: true,
        },
        taskImageUrl: {
            type: String,
        },
        taskUrl: {
            type: String
        }
    },
    { timestamps: true }
)

export default mongoose.model('taskItem', taskItemSchema, 'taskItem')