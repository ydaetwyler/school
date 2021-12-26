import { AuthenticationError } from 'apollo-server-express'

const updateEventItem = async (args, context, User, EventItem) => {
    if (!context.isAuth) {
        throw new AuthenticationError('Login necessary')
    }

    try {
        const { 
            activityName,
            activityImageUrl,
            activityDate,
            activityDescription,
            activityLocation,
            activityUrl
        } = args
    
        const updateEventItem = await EventItem.findOne({ hash: eventItemHash })
        
        if (activityName) updateEventItem.activityName = activityName
        if (activityImageUrl) updateEventItem.activityImageUrl = activityImageUrl
        if (activityDate) updateEventItem.activityDate = activityDate
        if (activityDescription) updateEventItem.activityDescription = activityDescription
        if (activityLocation) {
            updateEventItem.activityLocation = activityLocation
            // Remove coordinates!
        } 
        if (activityUrl) updateEventItem.activityUrl = activityUrl
    
        const newEventItem = await updateEventItem.save()
    
        return newEventItem.toJSON()

    } catch(e) {
        console.log(`Error updating event item -> ${e}`)
        throw e
    }
}

export default updateEventItem