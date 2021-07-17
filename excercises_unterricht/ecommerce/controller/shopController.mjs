import { fetchAlike } from '../helper/dbconnect.mjs'

export const getAllProd = (req, res, next) => {
    fetchAlike()
        .then(data => {
            (data.productItems.length > 0)
            ?   res.status(200).json(data.productItems)
            :   res.status(204).redirect('/invalid')
        })
        .catch(err => next(err))
}

export const getOneProd = (req, res, next) => {
    fetchAlike()
        .then(data => {
            const id = Number(req.params.id)
            const prod = data.productItems.find(prod => prod.id === id)

            prod
            ?   res.status(200).json(prod)
            :   res.status(404).redirect('/invalid')
        })
        .catch(err => next(err))
}