const getOne = async (itemHash, Item) => {
    try {
        const itemFetched = await Item.findOne({ hash: itemHash })
        
        return itemFetched.toJSON()

    } catch (e) {
        console.log(`Error fetching ${Item}, -> ${e}`)
    }
}

export default getOne