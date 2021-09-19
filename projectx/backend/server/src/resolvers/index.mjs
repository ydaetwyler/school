import Family from '../models/family.mjs'
import User from '../models/user.mjs'
import EventItem from '../models/eventItem.mjs'
import CollectionList from '../models/collectionList.mjs'
import TaskItem from '../models/taskItem.mjs'
import Comment from '../models/comment.mjs'

import getOne from './services/getOne.mjs'
import getAll from './services/getAll.mjs'

import {
    createFamily,
    createUser,
    createEventItem,
    createCollection,
    createTaskItem,
    createComment,
} from './services/create.mjs'
// import update from './services/update.mjs'
// import remove from './services/remove.mjs'

// Family
export const family = () => getAll(Family)

export const newFamily = args => createFamily(args, Family)

// User
export const allUsers = () => getAll(User)

export const user = id => getOne(id, User)

export const newUser = args => createUser(args, User)

// Event Item
export const allEventItems = () => getAll(EventItem)

export const eventItem = id => getOne(id, EventItem)

export const newEventItem = args => createEventItem(args, EventItem)

// Collections
export const allCollections = () => getAll(CollectionList)

export const collection = id => getOne(id, CollectionList)

export const newCollection = args => createCollection(args, CollectionList)

// Task Item
export const allTaskItems = () => getAll(TaskItem)

export const taskItem = id => getOne(id, TaskItem)

export const newTaskItem = args => createTaskItem(args, TaskItem)

// Comment
export const comment = id => getOne(id, Comment)

export const newComment = args => createComment(args, Comment)

