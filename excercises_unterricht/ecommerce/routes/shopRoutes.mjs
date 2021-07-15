import express from 'express'

import { getAllProd, getOneProd } from '../controller/shopController.mjs'

const router = express.Router()

router.get('/', getAllProd)
router.get('/:id', getOneProd)

export default router