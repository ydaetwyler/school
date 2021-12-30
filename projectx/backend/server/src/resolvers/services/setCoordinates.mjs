import { AuthenticationError } from 'apollo-server-express'

const setCoordinates = async (args, context, EventItem) => {
    if (!context.isAuth) {
        throw new AuthenticationError('Login necessary')
    }

    try {
        const { 
            _id,
            coordinates,
            activityApiCityNotFound,
        } = args

        if (coordinates) {
            const updateEventItem = await EventItem.findByIdAndUpdate({ _id }, { 
                activityCoordinates: coordinates 
            })
        }

        if (activityApiCityNotFound) {
            const updateEventItem = await EventItem.findByIdAndUpdate({ _id }, { 
                activityApiCityNotFound: activityApiCityNotFound
            })
        }
    

    } catch(e) {
        console.log(`Error updating event item -> ${e}`)
        throw e
    }
}

export default setCoordinates