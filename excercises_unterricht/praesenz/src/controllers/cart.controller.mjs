import CartItem from '../models/cartItem.mjs'
import { getArticle } from '../services/article.service.mjs'

import { getCartData } from '../services/cart.service.mjs'

export const getCart = async (req,res,next) => res.send(await getCartData())

export const addItem = async (req,res,next) => {
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
    
    res.send(await getCartData())
}

export const removeItem = async (req,res,next) => {
    await CartItem.deleteOne({ articleData: req.params.id })

    res.send(await getCartData())
}