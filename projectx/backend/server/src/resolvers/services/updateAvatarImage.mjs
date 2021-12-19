import { AuthenticationError } from 'apollo-server-express'

const updateAvatarImage = async (args, context, User) => {
    const { 
        avatarUrl
    } = args
    
    if (!context.isAuth) {
        throw new AuthenticationError('Login necessary')
    }
     
    try {
        let updateUser = await User.findById({ _id: context.userId })
    
        updateUser.avatarUrl = avatarUrl
    
        const newUser = await updateUser.save()
    
        return newUser
    } catch(e) {
        console.log(`Error updating avatar image -> ${e}`)
        throw e
    }
}

export default updateAvatarImage