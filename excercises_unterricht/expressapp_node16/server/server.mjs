import express from 'express'

const app = express()
const PORT = 3000

app.use(express.json())

app.listen(PORT, () => {
    console.log(`App started, listening at ${PORT}`)
})