import mongoose from 'mongoose' 

import Article from '../models/article.mjs'

const caster = id => mongoose.Types.ObjectId(id)

// -> /article/:id
export const get = async (req, res, next) => {
    try {
        console.log('get 🚀')
        const article = await Article.findOne({_id: caster(req.params.id) })
        res.send(article)
    } catch (e) {
        console.error(`Error -> ${e}`)
        next()
    }
}
// -> /article
export const list = async (req, res, next) => {
    try {
        console.log('list 🚀🚀🚀')
        const articles = await Article.find()
        res.send(articles)
    } catch (e) {
        console.error(`Error -> ${e}`)
        next()
    }
}
// -> /article
export const create = async (req, res, next) => {
    try {
        console.log('create 🚀')
        const article = await Article.create(req.body)
        res.send(article)
    } catch (e) {
        console.error(`Error -> ${e}`)
        next()
    }
}
// -> /article/:id
export const update = async (req, res, next) => {
    try {
        console.log('update 🚀')
        const result = await Article.findOneAndUpdate(req.params.id, req.body, { 
            new: true 
        })
        res.send(result)
    } catch (e) {
        res.send(e)
        console.error(`Error -> ${e}`)
        next()
    }
}
// -> /article/:id
export const remove = async (req, res, next) => {
    try {
        console.log('remove 🚀')
        const result = await Article.deleteOne({ _id: caster(req.params.id) })
        res.send(result)
    } catch (e) {
        res.send(e)
        console.error(`Error -> ${e}`)
        next()
    }
}