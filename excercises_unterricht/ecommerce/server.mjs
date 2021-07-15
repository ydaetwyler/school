import express from 'express'

import shopRoutes from './routes/shopRoutes.mjs'
import cartRoutes from './routes/cartRoutes.mjs'

const app = express()
const PORT = 4001

app.use(express.json())

app.use('/shop', shopRoutes)
app.use('/cart', cartRoutes)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})