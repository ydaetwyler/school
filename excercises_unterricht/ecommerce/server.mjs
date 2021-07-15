import express from 'express'
import fs, { fstat } from 'fs'

const app = express()
const PORT = 4001

let db = JSON.parse(fs.readFileSync('./db/db.json'))

const products = db.productItems
let cart = db.cartItems

app.use(express.json())

/* Save to db operation */
const save = () => {
    db.productItems = products
    db.cartItems = cart
    fs.writeFile('./db/db.json', JSON.stringify(db, null, 2), error => {
        if (error) throw error
    })
}

/* Get available products */
app.get('/shop', (req, res) => {
    if (products.length > 0) {
        res.status(200).json(products) 
    } else {
        res.status(204).end('Shop is empty')
    }
})

app.get('/shop/:id', (req, res) => {
    const id = Number(req.params.id)
    const prod = products.find(prod => prod.id === id)

    if (prod) {
        res.status(200).json(prod)
    } else {
        res.status(404).end()
    }
})

/* Get products in cart */
app.get('/cart', (req, res) => {
    if (cart.length > 0) {
        res.status(200).json(cart)
    } else {
        res.status(204).end('Empty cart')
    }
})

app.get('/cart/:id', (req, res) => {
    const id = Number(req.params.id)
    const item = cart.find(item => item.id === id)

    if (item) {
        res.status(200).json(item)
    } else {
        res.status(404).end()
    }
})

/* Post helper function */
const generateId = () => {
    const maxId = cart.length > 0
        ? Math.max(...cart.map(n => n.id))
        : 0
    return maxId + 1
}

/* Add products to cart */
app.post('/shop/add', (req, res) => {
    const body = req.body

    /* Check if empty */
    if (!body) {
        return response.status(400).json({
            error: 'empty request'
        })
    }
    /* Check if request is with valid product id */
    const requestId = Number(body.id)
    if (typeof(requestId) !== 'number' && requestId > products.length) {
        return response.status(400).json({
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
        id: generateId()
    }

    cart = cart.concat(item)

    res.status(200).end()
    save();
})

/* Update cart item - only comment */
app.put('/cart/:id', (req, res) => {
    const id = Number(req.params.id)
    const obj = cart.find(item => item.id === id)
    const comment = req.body.comment
    
    if (obj) {
        obj.comment = comment;
    
        cart = cart.filter(item => item.id !== id)
        cart.push(obj)

        res.status(200).end()
        save()
    } else {
        res.status(404).end()
    }
})

/* Remove from cart */
app.delete('/cart/:id', (req, res) => {
    const id = Number(req.params.id)
    const exists = cart.find(item => item.id === id)

    if (exists) {
        cart = cart.filter(item => item.id !== id)

        res.status(200).end()
        save()
    } else {
        res.status(404).end()
    }
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})