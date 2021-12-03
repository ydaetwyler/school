const removeEventItem = async (args, context, EventItem, Family) => {
    if (!context.isAuth) {
        throw new AuthenticationError('Login necessary')
    }

    try {
        const {
            eventItemHash,
            familyHash,
        } = args

        const eventItemToRemove = await EventItem.findOne({ hash: eventItemHash})

        await EventItem.deleteOne({ hash: eventItemHash })

        const updateFamily = await Family.findOne({ hash: familyHash})

        updateFamily.eventList.pull({ _id: eventItemToRemove.id })

        const newFamily = await updateFamily.save()

        return newFamily.toJSON()

    } catch(e) {
        console.log(`Error updating event item -> ${e}`)
        throw e
    }
}

export default removeEventItem