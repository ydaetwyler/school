import express from 'express'

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



app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})