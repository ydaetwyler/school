import express from 'express'

const router = express.Router()

// Get one
router.get('/article/:id')

// Get all
router.get('article')

// Upload one
router.post('/article')

// Update one
router.put('/article/:id')

// Remove one
router.delete('/article/:id')

export default router