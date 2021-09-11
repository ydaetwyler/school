import express from 'express'

import { get, list, create, update, remove } from '../controllers/article.controller.mjs'

const router = express.Router()

// Get 🚀
router.get('/article/:id', get)

// List 🚀🚀🚀
router.get('/article', list)

// Create 🚀
router.post('/article', create)

// Update 🚀
router.put('/article/:id', update)

// Remove 🚀
router.delete('/article/:id', remove)

export default router