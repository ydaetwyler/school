import { AuthenticationError } from 'apollo-server-express'

const updateAvatarImage = async (args, context, User) => {
    const { 
        avatarImageUrl,
        userHash,
    } = args

    
    if (!context.isAuth && !(context.checkUserHash === userHash)) {
        throw new AuthenticationError('Login necessary')
    }
    
    try {
        let updateUser = await User.findOne({ hash: userHash })
    
        updateUser.avatarUrl = avatarImageUrl
    
        const newUser = await updateUser.save()
    
        return newUser.toJSON()
    } catch(e) {
        console.log(`Error updating avatar image -> ${e}`)
        throw e
    }
}

export default updateAvatarImage