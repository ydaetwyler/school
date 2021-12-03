import { nanoid } from 'nanoid'

const createFamily = async (args, Family) => {    
    try {
        const { familyName } = args
        const family = new Family({
            familyName,
            hash: nanoid()
        })
        const newFamily = await family.save()
        return newFamily.toJSON()
    } catch (e) {
        console.log(`Error creating Family -> ${e}`)
        throw e
    }
}

export default createFamily