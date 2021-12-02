import { nanoid } from 'nanoid'

const createEventItem = async (args, EventItem, Family) => {
    try {
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