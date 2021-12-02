const updateAvatarImage = async (args, User) => {
    try {
        const { 
            avatarImageUrl,
            userHash,
        } = args
    
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