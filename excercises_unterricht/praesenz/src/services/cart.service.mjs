import CartItem from "../models/cartItem.mjs"

export const getCartData = async () => {
    const cart = await CartItem.find()

    let amount = 0

    cart.forEach(item => {
        amount += item.price * 100 * item.quantity
    })

    amount = parseFloat((amount / 100).toFixed(2))

    return { items: cart, totalAmount: amount, count: cart.length }
}