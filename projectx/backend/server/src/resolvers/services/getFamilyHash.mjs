import { AuthenticationError } from 'apollo-server-express'

const getFamilyHash = async (userId, context, User) => {
    if (!context.isAuth) {
        throw new AuthenticationError('Login necessary')
    }

    try {
        const user = await User.findOne({_id: userId})

        const hash = user.familyHash

        return hash
    } catch(e) {
        console.log(`Error fetching Family Hash, -> ${e}`)
    }

}

export default getFamilyHash