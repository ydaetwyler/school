const updateEventItem = async (args, EventItem) => {
    try {
        const { 
            activityName,
            activityImageUrl,
            activityDate,
            activityOwner,
            activityDescription,
            activityLocation,
            activityUrl,
            eventItemHash,
        } = args
    
        const updateEventItem = await EventItem.findOne({ hash: eventItemHash })
        
        if (activityName) updateEventItem.activityName = activityName
        if (activityImageUrl) updateEventItem.activityImageUrl = activityImageUrl
        if (activityDate) updateEventItem.activityDate = activityDate
        if (activityOwner) updateEventItem.activityOwner = activityOwner
        if (activityDescription) updateEventItem.activityDescription = activityDescription
        if (activityLocation) updateEventItem.activityLocation = activityLocation
        if (activityUrl) updateEventItem.activityUrl = activityUrl
    
        const newEventItem = await updateEventItem.save()
    
        return newEventItem.toJSON()

    } catch(e) {
        console.log(`Error updating event item -> ${e}`)
        throw e
    }
}

export default updateEventItem