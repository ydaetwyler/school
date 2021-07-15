import dbconnect from '../helper/dbconnect.mjs'

const products = dbconnect.db.productItems

export const getAllProd = (req, res) => {
    (products.length > 0)
        ?   res.status(200).json(products) 
        :    res.status(204).end('Shop is empty')
}

export const getOneProd = (req, res) => {
    const id = Number(req.params.id)
    const prod = products.find(prod => prod.id === id)

    prod
    ?   res.status(200).json(prod)
    :   res.status(404).end()
}