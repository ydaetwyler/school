const updateFamilyName = async (args, context, Family) => {
    if (!context.isAuth) {
        throw new AuthenticationError('Login necessary')
    }
    
    try {
        const { 
            familyName,
            familyHash,
        } = args
    
        let updateFamily = await Family.findOne({ hash: familyHash })
    
        updateFamily.familyName = familyName
    
        const newFamily = await updateFamily.save()
    
        return newFamily.toJSON()
    } catch(e) {
        console.log(`Error updating family name -> ${e}`)
        throw e
    }
}

export default updateFamilyName