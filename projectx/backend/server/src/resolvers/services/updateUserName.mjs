const updateUserName = async (args, User) => {
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