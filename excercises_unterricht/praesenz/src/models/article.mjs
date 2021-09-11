import mongoose from 'mongoose'
const { Schema } = mongoose

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    reviews: [
        {
            title: String,
            description: String,
            rating: Number
        }
    ]
})