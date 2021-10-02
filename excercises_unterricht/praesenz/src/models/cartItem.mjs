import mongoose from 'mongoose'

const { Schema } = mongoose

const cartItemSchema = new Schema({
    articleData: {
        type: mongoose.Types.ObjectId,
        ref: 'article',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number
    }
})

export default mongoose.model('cartItem', cartItemSchema, 'cartItem')