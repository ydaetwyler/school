import { AuthenticationError } from 'apollo-server-express'

const removeParticipant = async (args, context, EventItem) => {
    if (!context.isAuth) {
        throw new AuthenticationError('Login necessary')
    }

    try {
        const { 
            eventId
        } = args

        await EventItem.findByIdAndUpdate({ _id: eventId }, {
            $push: {
                activityParticipantsList: [context.userId]
            }
        })
    } catch (e) {
        console.log(`Error updating user name -> ${e}`)
        throw e
    }
}

export default removeParticipant