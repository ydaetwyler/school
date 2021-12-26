import { AuthenticationError } from 'apollo-server-express'

const setCoordinates = async (args, context, EventItem) => {
    if (!context.isAuth) {
        throw new AuthenticationError('Login necessary')
    }

    try {
        const { 
            _id,
            coordinates
        } = args

        console.log(coordinates)
    
        const updateEventItem = await EventItem.findByIdAndUpdate({ _id }, { 
            activityCoordinates: coordinates 
        })

    } catch(e) {
        console.log(`Error updating event item -> ${e}`)
        throw e
    }
}

export default setCoordinates