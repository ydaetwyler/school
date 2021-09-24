import { 
    family, 
    newFamily,
    allUsers,
    user,
    newUser,
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

const resolvers = {
    Query: {
        load: (_, __) => allFamilies(),
        family: {
            Family: (parent, args, context, info) => family(args),
        },
        familyMemberList: {
            FamilyMemberList: (parent, args, context, info) => familyMemberList(args),
        },
        user: {
            User: (parent, args, context, info) => user(args),
        },
        avatarList: {
            AvatarList: (parent, args, context, info) => avatarList(args),
        },
        eventItem: {
            EventItem: (parent, args, context, info) => eventItem(args),
        },
        activityImageList: {
            ActivityImageList: (parent, args, context, info) => activityImageList(args),
        },
        collectionList: {
            CollectionList: (parent, args, context, info) => collectionList(args),
        },
        taskItem: {
            TaskItem: (parent, args, context, info) => taskItem(args),
        },
        taskImageList: {
            TaskImageList: (parent, args, context, info) => taskImageList(args),
        },
        comment: {
            Comment: (parent, args, context, info) => comment(args)
        }
    },
}

export default resolvers