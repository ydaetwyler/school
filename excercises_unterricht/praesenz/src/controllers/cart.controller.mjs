import CartItem from '../models/cartItem.mjs'
import { getArticle } from '../services/article.service.mjs'

export const getCart = async(req,res,next) => {

}

export const addItem = async(req,res,next) => {
    const article = await getArticle(req.params.id)

    const articleExists = await CartItem.findOne({ articleData: article._id })

    if (articleExists) {
        await CartItem.findOneAndUpdate(
            { articleData: article._id },
            { $inc: { quantity: 1 }, price: article.price },
            { upsert: true }
        )
    } else {
        await CartItem.create({
            articleData: article._id,
            price: article.price,
            quantity: 1
        })
    }
    
    const cart = await CartItem.find()

    res.send(cart)
}

export const removeItem = async(req,res,next) => {

}