import mongoose from 'mongoose'
import Article from '../models/article.mjs'

const caster = id => mongoose.Types.ObjectId(id)

export const getArticle = async (id) => Article.findOne({ _id: caster(id) })

export const getArticles = async () => Article.find()

export const createArticle = async (payload) => Article.create(payload)

export const updateArticle = async (id, payload) => 
Article.findOneAndUpdate({ _id: caster(id) }, payload, { new: true })

export const removeArticle = async (id) => Article.deleteOne({ _id: caster(id) })