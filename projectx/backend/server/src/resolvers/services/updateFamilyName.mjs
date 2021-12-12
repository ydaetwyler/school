import { AuthenticationError } from 'apollo-server-express'

const updateFamilyName = async (args, context, Family) => {
    const { 
        familyName
    } = args
    
    if (!context.isAuth) {
        throw new AuthenticationError('Login necessary')
    }
    
    try {
        const user = User.findById({ _id: context.userId })

        const familyId = user.family

        let updateFamily = await Family.findById({ _id: familyId })
    
        updateFamily.familyName = familyName
    
        const newFamily = await updateFamily.save()
    
        return newFamily
    } catch(e) {
        console.log(`Error updating family name -> ${e}`)
        throw e
    }
}

export default updateFamilyName