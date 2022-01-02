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
import setWeather from './services/setWeather.mjs'
import removeParticipant from './services/removeParticipant.mjs'
import addParticipant from './services/addParticipant.mjs'
import checkUserParticipant from './services/checkUserParticipant.mjs'
import removeEventItem from './services/removeEventItem.mjs'
import createEventComment from './services/createEventComment.mjs'
import removeEventComment from './services/removeEventComment.mjs'

import getFamily from './services/getFamily.mjs'
import getUser from './services/getUser.mjs'
import getEventItem from './services/getEventItem.mjs'
import getEventParticipants from './services/getEventParticipants.mjs'
import getWeather from './services/getWeather.mjs'
import getCoordinates from './services/getCoordinates.mjs'

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
        setCoordinates: (_, args, context) => {
            pubsub.publish('COORDINATES_CHANGED', { coordinatesChanged: args }),
            setCoordinates(args, context, eventItem)
        },
        setWeather: (_, args, context) => {
            pubsub.publish('WEATHER_CHANGED', { weatherChanged: args }),
            setWeather(args, context, eventItem)
        },
        removeParticipant: (_, args, context) => {
            pubsub.publish('PARTICIPANTS_CHANGED', { eventParticipantsChanged: args }),
            removeParticipant(args, context, eventItem)
        },
        addParticipant: (_, args, context) => {
            pubsub.publish('PARTICIPANTS_CHANGED', { eventParticipantsChanged: args }),
            addParticipant(args, context, eventItem)
        },
        checkUserParticipant: (_, args, context) => checkUserParticipant(args, context, eventItem),
        updateEventItem: (_, args, context) => {
            pubsub.publish('EVENT_ITEM_CHANGED', { eventItemChanged: args }),
            updateEventItem(args, context, eventItem)
        },
        removeEventItem: (_, args, context) => removeEventItem(args, context, eventItem, family),
        createEventComment: (_, args, context) => createEventComment(args, context, comment, eventItem),
        removeEventComment: (_, args, context) => removeEventComment(args, context, comment, eventItem),
    },
    Query: {
        getFamily: (_, __, context) => getFamily(context, user, family),
        getUser: (_, __, context) => getUser(context, user),
        getEventItem: (_, args, context) => getEventItem(args, context, eventItem),
        getEventParticipants: (_, args, context) => getEventParticipants(args, context, eventItem),
        getWeather: (_, args, context) => getWeather(args, context, eventItem),
        getCoordinates: (_, args, context) => getCoordinates(args, context, eventItem),
    },
    Subscription: {
        familyChanged: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('FAMILY_CHANGED'),
                (payload, variables) => {
                    return (payload.familyChanged._id === variables._id)
                }
            )
        },
        eventItemChanged: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('EVENT_ITEM_CHANGED'),
                (payload, variables) => {
                    return (payload.eventItemChanged._id === variables._id)
                }
            )
        },
        eventParticipantsChanged: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('PARTICIPANTS_CHANGED'),
                (payload, variables) => {
                    return (payload.eventParticipantsChanged._id === variables._id)
                }
            )
        },
        weatherChanged: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('WEATHER_CHANGED'),
                (payload, variables) => {
                    return (payload.weatherChanged._id === variables._id)
                }
            )
        },
        coordinatesChanged: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('COORDINATES_CHANGED'),
                (payload, variables) => {
                    return (payload.coordinatesChanged._id === variables._id)
                }
            )
        }
    }
}

export default resolvers