/* import { 
    family, 
    newFamily,
    allUsers,
    user,
    newUser,
    loginUser,
    allEventItems,
    eventItem,
    newEventItem,
    allCollections,
    collection,
    newCollection,
    allTaskItems,
    taskItem,
    newTaskItem,
    comment,
    newComment
} from '../resolvers/index.mjs'
import { taskImageList } from './index.mjs'
import { activityImageList } from './index.mjs'
import { avatarList } from './index.mjs'
*/

import family from '../models/family.mjs'
import user from '../models/user.mjs'
import eventItem from '../models/eventItem.mjs'
import avatarList from '../models/avatarList.mjs'
import activityImageList from '../models/activityImageList.mjs'
import collectionList from '../models/collectionList.mjs'
import taskItem from '../models/taskItem.mjs'
import taskImageList from '../models/taskImageList.mjs'
import comment from '../models/comment.mjs'


import {
    createCollection,
    createTaskItem,
    createComment,
} from './services/create.mjs'
// import update from './services/update.mjs'
// import remove from './services/remove.mjs'

import signUp from './services/signup.mjs'
import signIn from './services/signin.mjs'
import updateUserName from './services/updateUserName.mjs'
import createFamily from './services/createFamily.mjs'
import updateAvatarImage from './services/updateAvatarImage.mjs'
import updateFamilyName from './services/updateFamilyName.mjs'
import createEventItem from './services/createEventItem.mjs'
import updateEventItem from './services/updateEventItem.mjs'
import removeEventItem from './services/removeEventItem.mjs'
import createEventComment from './services/createEventComment.mjs'
import removeEventComment from './services/removeEventComment.mjs'

import getFamily from './services/getFamily.mjs'

import getOne from './services/getOne.mjs'
import getAll from './services/getAll.mjs'

const resolvers = {
    Mutation: {
        createFamily: (_, args) => createFamily(args, family),
        signUp: (_, args) => signUp(args, user, family),
        signIn: (_, args) => signIn(args, user),
        updateAvatarImage: (_, args) => updateAvatarImage(args, user),
        updateFamilyName: (_, args) => updateFamilyName(args, family),
        updateUserName: (_, args) => updateUserName(args, user),
        createEventItem: (_, args) => createEventItem(args, eventItem, family),
        updateEventItem: (_, args) => updateEventItem(args, eventItem),
        removeEventItem: (_, args) => removeEventItem(args, eventItem, family),
        createEventComment: (_, args) => createEventComment(args, comment, eventItem),
        removeEventComment: (_, args) => removeEventComment(args, comment, eventItem),
    },
    Query: {
        load: (_, __) => allFamilies(),
        getFamily: (_, { hash }) => getFamily(hash, family),
        getUser: (_, { hash }) => getOne(hash, user),
        avatarList: {
            AvatarList: (_, { id }) => getOne(id, avatarList)
        },
        eventItem: {
            EventItem: (_, { hash }) => getOne(hash, eventItem)
        },
        activityImageList: {
            ActivityImageList: (_, { id }) => getOne(id, activityImageList)
        },
        collectionList: {
            CollectionList: (_, { id }) => getOne(id, collectionList),
        },
        taskItem: {
            TaskItem: (_, { id }) => getOne(id, taskItem),
        },
        taskImageList: {
            TaskImageList: (_, { id }) => getOne(id, taskImageList),
        },
        comment: {
            Comment: (_, { id }) => getOne(id, comment)
        }
    },
}

export default resolvers