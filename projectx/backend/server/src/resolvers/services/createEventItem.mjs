import { AuthenticationError } from 'apollo-server-express'

const createEventItem = async (args, context, EventItem, User, Family) => {
    const { 
        activityName,
        activityImageUrl,
        activityDate,
        activityDescription,
        activityLocation,
        activityAddress,
        activityUrl
    } = args
    
    if (!context.isAuth) {
        throw new AuthenticationError('Login necessary')
    }
    
    try {
        const user = await User.findById({ _id: context.userId })

        const familyId = await user.family

        const eventItem = await new EventItem({
            activityName,
            activityImageUrl,
            activityDate,
            activityOwner: user.id,
            activityDescription,
            activityLocation,
            activityAddress,
            activityUrl
        })

        const newEventItem = await eventItem.save()

        await Family.findByIdAndUpdate({ _id: familyId }, {
            $push: {
                eventList: [newEventItem.id]
            }
        })
    } catch (e) {
        console.log(`Error creating Event -> ${e}`)
        throw e
    }
}

export default createEventItem