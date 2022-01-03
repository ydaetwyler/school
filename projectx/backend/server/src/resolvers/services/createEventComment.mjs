import { AuthenticationError } from 'apollo-server-express'

const createEventComment = async (args, context, Comment, EventItem) => {
    if (!context.isAuth) {
        throw new AuthenticationError('Login necessary')
    }

    try {
        const { 
            _id,
            commentText
        } = args

        const comment = await new Comment({
            commentText,
            commentOwner: context.userId
        })

        await comment.save()

        await EventItem.findByIdAndUpdate({ _id: _id }, {
            $push: {
                comments: [comment]
            }
        })
        
    } catch (e) {
        console.log(`Error creating event comment -> ${e}`)
        throw e
    }
}

export default createEventComment