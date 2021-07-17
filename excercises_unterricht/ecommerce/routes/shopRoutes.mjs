import express from 'express'

import { getAllProd, getOneProd } from '../controller/shopController.mjs'
import { errorResponder } from '../controller/errorHandler.mjs'

const router = express.Router()

router.get('/', getAllProd)
router.get('/error', errorResponder)
router.get('/:id', getOneProd)
router.get('/error', errorResponder)

export default router