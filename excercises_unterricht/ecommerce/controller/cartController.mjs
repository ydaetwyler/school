import dbconnect from '../helper/dbconnect.mjs'
import generateId from '../helper/idgen.mjs'

const products = dbconnect.db.productItems
let cart = dbconnect.db.cartItems
const db = dbconnect

export const getAllItems = (req, res) => {
    (cart.length > 0)
        ?   res.status(200).json(cart)
        :   res.status(204).end('Empty cart')
}

export const getOneItem = (req, res) => {
    const id = Number(req.params.id)
    const item = cart.find(item => item.id === id)

    item
        ?   res.status(200).json(item)
        :   res.status(404).end()
}

export const addItem = (req, res) => {
    const body = req.body

    /* Check if empty */
    if (!body) {
        return res.status(400).json({
            error: 'empty request'
        })
    }
    /* Check if request is with valid product id */
    const requestId = Number(body.id)
    if (typeof(requestId) !== 'number' && requestId > products.length) {
        return res.status(400).json({
            error: 'product not valid'
        })
    }

    const comment = body.comment

    const productObj = products.find(prod => prod.id === requestId)
    
    const product = productObj.product
    const price = productObj.price

    const item = {
        product: product,
        price: price,
        date: new Date(),
        comment: comment,
        id: generateId(cart)
    }

    cart = cart.concat(item)

    res.status(200).end()
    db.save(products, cart);
}

/* Update cart item - only comment */
export const updateItem = (req, res) => {
    const id = Number(req.params.id)
    const obj = cart.find(item => item.id === id)
    const comment = req.body.comment
    
    if (obj) {
        obj.comment = comment;
    
        cart = cart.filter(item => item.id !== id)
        cart.push(obj)

        res.status(200).end()
        db.save(products, cart)
    } else {
        res.status(404).end()
    }
}

export const removeItem = (req, res) => {
    const id = Number(req.params.id)
    const exists = cart.find(item => item.id === id)

    if (exists) {
        cart = cart.filter(item => item.id !== id)

        res.status(200).end()
        db.save(products, cart)
    } else {
        res.status(404).end()
    }
}