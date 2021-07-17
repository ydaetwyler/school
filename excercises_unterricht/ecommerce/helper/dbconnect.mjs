import fs from 'fs-extra'

// export let db = JSON.parse(fs.readFileSync('./db/db.json'))

export const fetchAlike = () => fs.readJson('./db/db.json')

/* Save to db operation */
export const save = (products, cart) => {
    const db = {}
    db.productItems = products
    db.cartItems = cart
    fs.writeJson('./db/db.json', db, error => {
        if (error) throw error
    })
}