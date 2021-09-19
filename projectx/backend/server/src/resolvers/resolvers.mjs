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

const resolvers = {
    Query: {
        currentFamily: (_, __) => family()
    }
}

export default resolvers