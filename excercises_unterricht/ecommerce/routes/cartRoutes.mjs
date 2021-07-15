import express from 'express'

import { getAllItems, getOneItem, addItem, updateItem, removeItem } from '../controller/cartController.mjs'

const router = express.Router()

router.get('/', getAllItems)
router.get('/:id', getOneItem)

router.post('/add', addItem)

router.put('/:id', updateItem)

router.delete('/:id', removeItem)

export default router