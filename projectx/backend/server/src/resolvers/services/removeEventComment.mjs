import { AuthenticationError } from 'apollo-server-express'

const removeEventComment = async (args, context, Comment, EventItem) => {
    if (!context.isAuth) {
        throw new AuthenticationError('Login necessary')
    }

    try {
        const {
            commentId,
            eventItemId
        } = args

        const commentToRemove = await Comment.findById({ _id: commentId })

        await Comment.findByIdAndDelete({ _id: commentId })

        await EventItem.findByIdAndUpdate({ _id: eventItemId }, {
            $pullAll: {
                comments: [commentToRemove._id]
            }
        })

    } catch(e) {
        console.log(`Error removing event comment -> ${e}`)
        throw e
    }
}

export default removeEventComment