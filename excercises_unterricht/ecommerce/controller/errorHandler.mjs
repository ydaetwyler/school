export const errorResponder = (err, req, res, next) => {
    res.status(err.statusCode).json(err)
}

export const invalidPathHandler = (req, res, next) => {
    res.status(404).end('Invalid path!')
}