const updateFamilyName = async (args, Family) => {
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