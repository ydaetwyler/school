import { AuthenticationError } from 'apollo-server-express'
import { nanoid } from 'nanoid'

const createEventComment = async (args, context, Comment, EventItem) => {
    if (!context.isAuth) {
        throw new AuthenticationError('Login necessary')
    }

    try {
        const { 
            commentText,
            commentOwner,
            eventItemHash,
        } = args
        const comment = new Comment({
            hash: nanoid(),
            commentText,
            commentOwner,
        })
        const newComment = await comment.save()

        let updateEventItem = await EventItem.findOne({ hash: eventItemHash })

        updateEventItem.comments.push(newComment.id)

        const newEventItem = await updateEventItem.save()

        return newEventItem.toJSON()
        
    } catch (e) {
        console.log(`Error creating Event -> ${e}`)
        throw e
    }
}

export default createEventComment