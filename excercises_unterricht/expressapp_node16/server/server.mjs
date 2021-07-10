import express from 'express'

const app = express()
const PORT = 3000

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get("/users", (req, res) => {
    res.sendFile(path.join(__dirname, ".(users.html"))
})

app.use()

app.listen(PORT, () => {
    console.log(`App started, listening at ${PORT}`)
})