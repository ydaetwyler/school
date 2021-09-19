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
export const family = async () => getAll(Family)

export const newFamily = async args => createFamily(args, Family)

// User
export const allUsers = async () => getAll(User)

export const user = async id => getOne(id, User)

export const newUser = async args => createUser(args, User)

// Event Item
export const allEventItems = async () => getAll(EventItem)

export const eventItem = async id => getOne(id, EventItem)

export const newEventItem = async args => createEventItem(args, EventItem)

// Collections
export const allCollections = async () => getAll(CollectionList)

export const collection = async id => getOne(id, CollectionList)

export const newCollection = async args => createCollection(args, CollectionList)

// Task Item
export const allTaskItems = async () => getAll(TaskItem)

export const taskItem = async id => getOne(id, TaskItem)

export const newTaskItem = async args => createTaskItem(args, TaskItem)

// Comment
export const comment = async id => getOne(id, Comment)

export const newComment = async args => createComment(args, Comment)

