import { AuthenticationError } from 'apollo-server-express'

const getFamily = async (context, User, Family) => {
    if (!context.isAuth) {
        throw new AuthenticationError('Login necessary')
    }
    
    try {
        console.log(context.userId)
        const user = User.findById({ _id: context.userId })

        console.log(user.family)

        const familyId = user.family

        const familyFetched = await Family.findOne({ id: familyId })
            .populate('eventList')
        
        return familyFetched.toJSON()

    } catch (e) {
        console.log(`Error fetching family, -> ${e}`)
        throw e
    }
}

export default getFamily