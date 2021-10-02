import CartItem from "../models/cartItem.mjs"

export const getCartData = async () => {
    const cartItems = await CartItem.find().populate('articleData')

    return { 
        items: cartItems, 
        totalAmount: calculateCart(cartItems), 
        count: cartItems.length 
    }
}

const calculateCart = items => {
    let amount = 0
    items.forEach(item => (amount += item.price * 100 * item.quantity))
    return parseFloat((amount / 100).toFixed(2))
}