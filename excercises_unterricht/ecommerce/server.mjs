import express, { response } from 'express'

const app = express()
const PORT = 3000

app.use(express.json())

let products = [
    {
        id: 1,
        product: "Lightsaber",
        price: "25000"
    },
    {
        id: 2,
        product: "Sword",
        price: "5000"
    },
    {
        id: 3,
        product: "Knife",
        price: "1000"
    },
    {
        id: 4,
        product: "Wood",
        price: "20"
    }
]

let cart = []

/* Get available products */
app.get('/shop', (req, res) => {
    res.json(products)
})

app.get('/shop/:id', (req, res) => {
    const id = Number(req.params.id)
    const prod = products.find(prod => prod.id === id)

    if (prod) {
        res.json(prod)
    } else {
        res.status(404).end()
    }
})

/* Get products in cart */
app.get('/cart', (req, res) => {
    if (cart.length > 0) {
        res.json(cart)
    } else {
        res.end('Empty cart')
    }
})

app.get('/cart/:id', (req, res) => {
    const id = Number(req.params.id)
    const item = cart.find(item => item.id === id)

    if (item) {
        res.json(item)
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
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    /* Check if request is with valid product id */
    const requestId = body.content.id
    if (typeof(requestId) !== 'number' && requestId > products.length) {
        return response.statzs(400).json({
            error: 'product not valid'
        })
    }

    const productObj = products[body.content]
    
    const product = productObj.product
    const price = productObj.price

    const item = {
        product: product,
        price: price,
        date: new Date(),
        id: generateId()
    }

    cart = cart.concat(item)

    res.json(item)
})

/* Remove from cart */
app.delete('/cart/:id', (req, res) => {
    const id = Number(req.params.id)
    cart = cart.filter(item => item.id !== id)

    res.status(204).end()
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})