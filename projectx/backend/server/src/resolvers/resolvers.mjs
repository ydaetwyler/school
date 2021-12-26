import { PubSub, withFilter } from 'graphql-subscriptions'

const pubsub = new PubSub()

import family from '../models/family.mjs'
import user from '../models/user.mjs'
import eventItem from '../models/eventItem.mjs'
import comment from '../models/comment.mjs'

import signUp from './services/signup.mjs'
import signIn from './services/signin.mjs'
import createFamily from './services/createFamily.mjs'
import lostPassword from './services/lostPassword.mjs'
import resetPassword from './services/resetPassword.mjs'
import updateUser from './services/updateUser.mjs'
import updateFamily from './services/UpdateFamily.mjs'
import invite from './services/invite.mjs'
import createEventItem from './services/createEventItem.mjs'
import updateEventItem from './services/updateEventItem.mjs'
import setCoordinates from './services/setCoordinates.mjs'
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
        updateFamily: (_, args, context) => {
            pubsub.publish('FAMILY_CHANGED', { familyChanged: args })
            updateFamily(args, context, user, family)
        },
        updateUser: (_, args, context) => updateUser(args, context, user),
        invite: (_, args, context) => invite(args, context, family, user),
        createEventItem: (_, args, context) => createEventItem(args, context, eventItem, user, family),
        setCoordinates: (_, args, context) => setCoordinates(args, context, eventItem),
        updateEventItem: (_, args, context) => updateEventItem(args, context, eventItem),
        removeEventItem: (_, args, context) => removeEventItem(args, context, eventItem, family),
        createEventComment: (_, args, context) => createEventComment(args, context, comment, eventItem),
        removeEventComment: (_, args, context) => removeEventComment(args, context, comment, eventItem),
    },
    Query: {
        getFamily: (_, __, context) => getFamily(context, user, family),
        getUser: (_, __, context) => getUser(context, user)
    },
    Subscription: {
        familyChanged: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('FAMILY_CHANGED'),
                (payload, variables) => {
                    return (payload.familyChanged._id === variables._id)
                }
            )
        }
    }
}

export default resolvers