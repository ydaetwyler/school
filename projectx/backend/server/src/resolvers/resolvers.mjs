import family from '../models/family.mjs'
import user from '../models/user.mjs'
import eventItem from '../models/eventItem.mjs'
import avatarList from '../models/avatarList.mjs'
import activityImageList from '../models/activityImageList.mjs'
import collectionList from '../models/collectionList.mjs'
import taskItem from '../models/taskItem.mjs'
import taskImageList from '../models/taskImageList.mjs'
import comment from '../models/comment.mjs'

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
import getFamilyHash from './services/getFamilyHash.mjs'

const resolvers = {
    Mutation: {
        createFamily: (_, args) => createFamily(args, family),
        signUp: (_, args) => signUp(args, user, family),
        signIn: (_, args) => signIn(args, user),
        updateAvatarImage: (_, args, context) => updateAvatarImage(args, context, user),
        updateFamilyName: (_, args, context) => updateFamilyName(args, context, family),
        updateUserName: (_, args, context) => updateUserName(args, context, user),
        createEventItem: (_, args, context) => createEventItem(args, context, eventItem, family),
        updateEventItem: (_, args, context) => updateEventItem(args, context, eventItem),
        removeEventItem: (_, args, context) => removeEventItem(args, context, eventItem, family),
        createEventComment: (_, args, context) => createEventComment(args, context, comment, eventItem),
        removeEventComment: (_, args, context) => removeEventComment(args, context, comment, eventItem),
    },
    Query: {
        load: (_, __) => allFamilies(),
        getFamily: (_, { hash }, context) => getFamily(hash, context, family),
        getFamilyHash: (_, { id }, context) => getFamilyHash(id, context, user),
    },
}

export default resolvers