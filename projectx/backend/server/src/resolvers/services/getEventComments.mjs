import { AuthenticationError } from 'apollo-server-express'

const getEventComments = async (args, context, EventItem) => {
    if (!context.isAuth) {
        throw new AuthenticationError('Login necessary')
    }
    
    try {
        const { _id } = args

        const eventItemFetched = await EventItem.findById({ _id: _id })
            .populate('comments')

        return eventItemFetched
    } catch (e) {
        console.log(`Error fetching event comments, -> ${e}`)
        throw e
    }
}

export default getEventComments