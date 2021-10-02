import express from 'express'

import connect from './utils/db.mjs'
import articleRoutes from './routes/article.routes.mjs'
import cartRoutes from './routes/cart.routes.mjs'

// Connects to mongo db
connect()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.listen(port, () => 
    console.log(`🚀 E-Commerce Backend up and running on port -> ${port}`)
)

app.use('/', articleRoutes)
app.use('/', cartRoutes)

app.use(express.static('public'))