import { AuthenticationError } from 'apollo-server-express'

const createEventItem = async (args, context, EventItem, User, Family) => {
    const { 
        activityName,
        activityImageUrl,
        activityDate,
        activityDescription,
        activityLocation,
        activityUrl
    } = args
    
    if (!context.isAuth) {
        throw new AuthenticationError('Login necessary')
    }
    
    try {

        const user = User.findById({ _id: context.userId })

        const familyId = user.family

        const eventItem = new EventItem({
            activityName,
            activityImageUrl,
            activityDate,
            activityOwner: user.id,
            activityDescription,
            activityLocation,
            activityUrl
        })
        const newEventItem = await eventItem.save()

        let updateFamily = await Family.findById({ _id: familyId })

        updateFamily.eventList.push(newEventItem.id)

        await updateFamily.save()

        return newEventItem
        
    } catch (e) {
        console.log(`Error creating Event -> ${e}`)
        throw e
    }
}

export default createEventItem