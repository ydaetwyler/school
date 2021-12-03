import { AuthenticationError } from 'apollo-server-express'

const updateUserName = async (args, context, User) => {
    const { 
        userName,
        userHash,
    } = args
    
    if (!context.isAuth && !(context.checkUserHash === userHash)) {
        throw new AuthenticationError('Login necessary')
    }

    try {
        let updateUser = await User.findOne({ hash: userHash })
    
        updateUser.userName = userName
    
        const newUser = await updateUser.save()
    
        return newUser.toJSON()
    } catch (e) {
        console.log(`Error updating user name -> ${e}`)
        throw e
    }
}

export default updateUserName