import { AuthenticationError } from 'apollo-server-express'

const getFamily = async (context, User, Family) => {
    
    if (!context.isAuth) {
        throw new AuthenticationError('Login necessary')
    }
    
    try {
        const user = User.findOne({ _id: context.userId })

        const familyId = user.family

        const familyFetched = await Family.findOne({ _id: familyId })
            .populate('eventList')
        
        return familyFetched.toJSON()

    } catch (e) {
        console.log(`Error fetching ${Item}, -> ${e}`)
        throw e
    }
}

export default getFamily