import { 
    getArticle,
    getArticles,
    createArticle,
    updateArticle,
    removeArticle,
 } from '../services/article.service.mjs'

 const displayError = (e) => console.error(`Error -> ${e}`)

// -> /article/:id
export const get = async (req, res, next) => {
    try {
        console.log('get 🚀')
        res.send(await getArticle(req.params.id))
    } catch (e) {
        displayError(e)
        next()
    }
}
// -> /article
export const list = async (req, res, next) => {
    try {
        console.log('list 🚀🚀🚀')
        res.send(await getArticles())
    } catch (e) {
        displayError(e)
        next()
    }
}
// -> /article
export const create = async (req, res, next) => {
    try {
        console.log('create 🚀')
        res.send(await createArticle(req.body))
    } catch (e) {
        displayError(e)
        next()
    }
}
// -> /article/:id
export const update = async (req, res, next) => {
    try {
        console.log('update 🚀')
        res.send(await updateArticle(req.params.id, req.body))
    } catch (e) {
        res.send(e)
        displayError(e)
        next()
    }
}
// -> /article/:id
export const remove = async (req, res, next) => {
    try {
        console.log('remove 🚀')
        res.send(await removeArticle(req.params.id))
    } catch (e) {
        res.send(e)
        displayError(e)
        next()
    }
}