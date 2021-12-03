import { AuthenticationError } from 'apollo-server-express'
import { nanoid } from 'nanoid'

const createEventItem = async (args, context, EventItem, Family) => {
    const { 
        activityName,
        activityImageUrl,
        activityDate,
        activityOwner,
        activityDescription,
        activityLocation,
        activityUrl,
        familyHash,
    } = args
    
    if (!context.isAuth && !(context.checkFamilyHash === familyHash)) {
        throw new AuthenticationError('Login necessary')
    }
    
    try {
        const eventItem = new EventItem({
            hash: nanoid(),
            activityName,
            activityImageUrl,
            activityDate,
            activityOwner,
            activityDescription,
            activityLocation,
            activityUrl,
        })
        const newEventItem = await eventItem.save()

        let updateFamily = await Family.findOne({ hash: familyHash })

        updateFamily.eventList.push(newEventItem.id)

        await updateFamily.save()

        return newEventItem.toJSON()
        
    } catch (e) {
        console.log(`Error creating Event -> ${e}`)
        throw e
    }
}

export default createEventItem