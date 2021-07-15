import fs from 'fs'

let db = JSON.parse(fs.readFileSync('./db/db.json'))

/* Save to db operation */
const save = (products, cart) => {
    db.productItems = products
    db.cartItems = cart
    fs.writeFile('./db/db.json', JSON.stringify(db, null, 2), error => {
        if (error) throw error
    })
}

export default { db, save }