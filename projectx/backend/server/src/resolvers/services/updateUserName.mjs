import { AuthenticationError } from 'apollo-server-express'

const updateUserName = async (args, context, User) => {
    const { 
        userName
    } = args
    
    if (!context.isAuth) {
        throw new AuthenticationError('Login necessary')
    }

    try {
        let updateUser = await User.findById({ _id: context.userId })
    
        updateUser.userName = userName
    
        const newUser = await updateUser.save()
    
        return newUser
    } catch (e) {
        console.log(`Error updating user name -> ${e}`)
        throw e
    }
}

export default updateUserName