import mongoose from 'mongoose'

const caster = id => Mongoose.Types.ObjectId(id)

const getOne = async (id, item) => {
    try {
        const itemFetched = await item.findOne({ _id: caster(id) })
        return {
            payload: itemFetched._doc,
            _id: itemFetched.id,
            createdAt: new Date(itemFetched._doc.createdAt).toISOString(),
        }
    } catch (e) {
        console.log(`Error fetching ${item}, -> ${e}`)
    }
}

export default getOne