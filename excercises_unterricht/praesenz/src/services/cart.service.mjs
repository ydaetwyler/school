import CartItem from "../models/cartItem.mjs"

const calculateCart = items => {
    let amount = 0
    items.forEach(item => (amount += item.price * 100 * item.quantity))
    return parseFloat((amount / 100).toFixed(2))
}

export const getCartData = async () => {
    const cartItems = await CartItem.find().populate('articleData')

    return { 
        items: cartItems, 
        totalAmount: calculateCart(cartItems), 
        count: cartItems.length 
    }
}

export const addToCart = async article => {
    const articleExists = await CartItem.findOne({ articleData: article._id })

    if (articleExists) {
        return CartItem.findOneAndUpdate(
            { articleData: article._id },
            { $inc: { quantity: 1 }, price: article.price },
            { upsert: true }
        )
    } else {
        return CartItem.create({
            articleData: article._id,
            price: article.price,
            quantity: 1
        })
    }
}