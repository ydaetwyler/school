const getAll = item => {
    try {
        const itemsFetched = await item.find()
        return itemsFetched.map(item => {
            return {
                ...item._doc,
                _id: item.id,
                createdAt: new Date(item._doc.createdAt).toISOString(),
            }
        })
    } catch (e) {
        console.log(`Error fetching all ${item}, -> ${e}`)
        throw e
    }
}

export default getAll