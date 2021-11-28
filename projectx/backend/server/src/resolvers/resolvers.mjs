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
import createFamily from './services/createFamily.mjs'
import createEventItem from './services/createEventItem.mjs'

import getOne from './services/getOne.mjs'
import getAll from './services/getAll.mjs'

const resolvers = {
    Mutation: {
        createFamily: (_, args) => createFamily(args, family),
        signUp: (_, args) => signUp(args, user, family),
        signIn: (_, args) => signIn(args, user),
        createEventItem: (_, args) => createEventItem(args, eventItem, family)
    },
    Query: {
        load: (_, __) => allFamilies(),
        family: {
            Family: (_, { id }) => getOne(id, family),
        },
        user: {
            User: (_, { id }) => getOne(id, user),
        },
        avatarList: {
            AvatarList: (_, { id }) => getOne(id, avatarList),
        },
        eventItem: {
            EventItem: (_, { id }) => getOne(id, eventItem),
        },
        activityImageList: {
            ActivityImageList: (_, { id }) => getOne(id, activityImageList),
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