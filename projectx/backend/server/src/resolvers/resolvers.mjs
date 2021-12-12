import family from '../models/family.mjs'
import user from '../models/user.mjs'
import eventItem from '../models/eventItem.mjs'
import comment from '../models/comment.mjs'

import signUp from './services/signup.mjs'
import signIn from './services/signin.mjs'
import createFamily from './services/createFamily.mjs'
import lostPassword from './services/lostPassword.mjs'
import resetPassword from './services/resetPassword.mjs'
import updateUserName from './services/updateUserName.mjs'
import updateAvatarImage from './services/updateAvatarImage.mjs'
import updateFamilyName from './services/updateFamilyName.mjs'
import createEventItem from './services/createEventItem.mjs'
import updateEventItem from './services/updateEventItem.mjs'
import removeEventItem from './services/removeEventItem.mjs'
import createEventComment from './services/createEventComment.mjs'
import removeEventComment from './services/removeEventComment.mjs'

import getFamily from './services/getFamily.mjs'
import getUser from './services/getUser.mjs'

const resolvers = {
    Mutation: {
        createFamily: (_, args) => createFamily(args, family, user),
        signUp: (_, args) => signUp(args, user),
        signIn: (_, args) => signIn(args, user),
        lostPassword: (_, args) => lostPassword(args, user),
        resetPassword: (_, args) => resetPassword(args, user),
        updateAvatarImage: (_, args, context) => updateAvatarImage(args, context, user),
        updateFamilyName: (_, args, context) => updateFamilyName(args, context, user, family),
        updateUserName: (_, args, context) => updateUserName(args, context, user),
        createEventItem: (_, args, context) => createEventItem(args, context, eventItem, user, family),
        updateEventItem: (_, args, context) => updateEventItem(args, context, eventItem),
        removeEventItem: (_, args, context) => removeEventItem(args, context, eventItem, family),
        createEventComment: (_, args, context) => createEventComment(args, context, comment, eventItem),
        removeEventComment: (_, args, context) => removeEventComment(args, context, comment, eventItem),
    },
    Query: {
        getFamily: (_, __, context) => getFamily(context, user, family),
        getUser: (_, __, context) => getUser(context, user)
    },
}

export default resolvers