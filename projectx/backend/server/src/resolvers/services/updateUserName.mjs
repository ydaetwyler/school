const updateUserName = async (args, context, User) => {
    if (!context.isAuth) {
        throw new AuthenticationError('Login necessary')
    }

    try {
        const { 
            userName,
            userHash,
        } = args
    
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