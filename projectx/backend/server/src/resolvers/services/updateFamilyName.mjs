import { AuthenticationError } from 'apollo-server-express'

const updateFamilyName = async (args, context, Family) => {
    const { 
        familyName,
        familyHash,
    } = args
    
    if (!context.isAuth && !(context.checkFamilyHash === familyHash)) {
        throw new AuthenticationError('Login necessary')
    }
    
    try {
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