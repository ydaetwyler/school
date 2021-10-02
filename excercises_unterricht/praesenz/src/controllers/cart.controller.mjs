import CartItem from '../models/cartItem.mjs'

import { getArticle } from '../services/article.service.mjs'
import { getCartData, addToCart } from '../services/cart.service.mjs'

export const getCart = async (req,res,next) => res.send(await getCartData())

export const addItem = async (req,res,next) => {
    const article = await getArticle(req.params.id)
    
    await addToCart(article)
    
    res.send(await getCartData())
}

export const removeItem = async (req,res,next) => {
    await CartItem.deleteOne({ articleData: req.params.id })

    res.send(await getCartData())
}