import { AuthenticationError } from 'apollo-server-express'

const getFamily = async (familyHash, context, Family) => {
    if (!context.isAuth && !(context.checkFamilyHash === familyHash)) {
        throw new AuthenticationError('Login necessary')
    }
    
    try {
        const familyFetched = await Family.findOne({ hash: familyHash })
            .populate('eventList')
        
        return familyFetched.toJSON()

    } catch (e) {
        console.log(`Error fetching ${Item}, -> ${e}`)
        throw e
    }
}

export default getFamily