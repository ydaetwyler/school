import express from 'express'

import { getAllItems, getOneItem, addItem, updateItem, removeItem } from '../controller/cartController.mjs'
import { errorResponder } from '../controller/errorHandler.mjs'

const router = express.Router()

router.get('/', getAllItems)
router.get('/error', errorResponder)
router.get('/:id', getOneItem)
router.get('/error', errorResponder)

router.post('/add', addItem)
router.get('/error', errorResponder)

router.put('/:id', updateItem)
router.get('/error', errorResponder)

router.delete('/:id', removeItem)
router.get('/error', errorResponder)

export default router