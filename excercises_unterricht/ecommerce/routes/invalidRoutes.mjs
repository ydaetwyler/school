import express from 'express'

import { invalidPathHandler } from '../controller/errorHandler.mjs'

const router = express.Router()

router.get('/', invalidPathHandler)

export default router