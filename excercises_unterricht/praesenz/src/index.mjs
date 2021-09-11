import express from 'express'

import connect from './utils/db.mjs'

const app = express()
const port = 3000

app.use(express.json())

app.listen(port, () => 
    console.log(`E-Commerce`)
)
