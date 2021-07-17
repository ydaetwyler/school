import { fetchAlike, save } from '../helper/dbconnect.mjs'
import generateId from '../helper/idgen.mjs'

export const getAllItems = (req, res, next) => {
    fetchAlike()
        .then(data => {
            (data.cartItems.length > 0)
            ?   res.status(200).json(data.cartItems)
            :   res.status(204).redirect('/invalid')
        })
        .catch(err => next(err))
}

export const getOneItem = (req, res, next) => {
    fetchAlike()
        .then(data => {
            const id = Number(req.params.id)
            const item = data.cartItems.find(item => item.id === id)
        
            item
                ?   res.status(200).json(item)
                :   res.status(404).redirect('/invalid')
        })
        .catch(err => next(err))
}

export const addItem = (req, res, next) => {
    fetchAlike()
        .then(data => {
            const body = req.body

            /* Check if empty */
            if (!body) {
                return res.status(400).json({
                    error: 'empty request'
                })
            }
            /* Check if request is with valid product id */
            const requestId = Number(body.id)
            if (typeof(requestId) !== 'number' && requestId > data.productItems.length) {
                return res.status(400).json({
                    error: 'product not valid'
                })
            }
        
            const comment = body.comment
            const productObj = data.productItems.find(prod => prod.id === requestId)
            const { product, price } = productObj
        
            const item = {
                product,
                price,
                date: new Date(),
                comment,
                id: generateId(data.cartItems)
            }
        
            data.cartItems = data.cartItems.concat(item)
        
            res.status(200).end()
            save(data.productItems, data.cartItems);
        })
        .catch(err => next(err))
}    

/* Update cart item - only comment */
export const updateItem = (req, res, next) => {
    fetchAlike()
        .then(data => {
            const id = Number(req.params.id)
            const obj = data.cartItems.find(item => item.id === id)
            const comment = req.body.comment
            
            if (obj) {
                obj.comment = comment;
            
                data.cartItems = data.cartItems.filter(item => item.id !== id)
                data.cartItems.push(obj)
        
                res.status(200).end()
                save(data.productItems, data.cartItems)
            } else {
                res.status(404).redirect('/invalid')
            }
        })
        .catch(err => next(err))
}

export const removeItem = (req, res, next) => {
    fetchAlike()
        .then(data => {
            const id = Number(req.params.id)
            const exists = data.cartItems.find(item => item.id === id)
        
            if (exists) {
                data.cartItems = data.cartItems.filter(item => item.id !== id)
        
                res.status(200).end()
                save(data.productItems, data.cartItems)
            } else {
                res.status(404).redirect('/invalid')
            }
        })
        .catch(err => next(err))
}