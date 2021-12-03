import { AuthenticationError } from 'apollo-server-express'

const removeEventComment = async (args, context, Comment, EventItem) => {
    if (!context.isAuth) {
        throw new AuthenticationError('Login necessary')
    }

    try {
        const {
            commentHash,
            eventItemHash,
        } = args

        const commentToRemove = await Comment.findOne({ hash: commentHash})

        await Comment.deleteOne({ hash: commentHash })

        const updateEventItem = await EventItem.findOne({ hash: eventItemHash })

        updateEventItem.comments.pull({ _id: commentToRemove.id })

        const newEventItem = await updateEventItem.save()

        return newEventItem.toJSON()

    } catch(e) {
        console.log(`Error updating event item -> ${e}`)
        throw e
    }
}

export default removeEventComment