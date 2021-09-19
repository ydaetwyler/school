export const createFamily = async (args, Family) => {
    try {
        const { familyName } = args.family
        const family = new Family({
            familyName,
        })
        const newFamily = await family.save()
        return { ...newFamily._doc, _id: newFamily.id }
    } catch (e) {
        console.log(`Error creating Family -> ${e}`)
        throw e
    }
}

export const createUser = async (args, User) => {
    try {
        const { userEmail, userName, avatarUrl } = args.user
        const user = new User({
            userEmail,
            userName,
            avatarUrl,
        })
        const newUser = await user.save()
        return { ...newUser._doc, _id: newUser.id }
    } catch (e) {
        console.log(`Error creating User -> ${e}`)
        throw e
    }
}

export const createEventItem = async (args, EventItem) => {
    try {
        const { 
            activityName,
            activityImageUrl,
            activityDate,
            activityOwner,
            activityDescription,
            activityLocation,
            activityUrl,
        } = args.eventItem
        const eventItem = new EventItem({
            activityName,
            activityImageUrl,
            activityDate,
            activityOwner,
            activityDescription,
            activityLocation,
            activityUrl,
        })
        const newEventItem = await eventItem.save()
        return { ...newEventItem._doc, _id: newEventItem.id }
    } catch (e) {
        console.log(`Error creating Event -> ${e}`)
        throw e
    }
}

export const createCollection = async (args, Collection) => {
    try {
        const { 
            collectionName, 
            collectionIconUrl,
        } = args.collection
        const collection = new Collection({
            collectionName, 
            collectionIconUrl,
        })
        const newCollection = await collection.save()
        return { ...newCollection._doc, _id: newCollection.id }
    } catch (e) {
        console.log(`Error creating Collection -> ${e}`)
        throw e
    }
}

export const createTaskItem = async (args, TaskItem) => {
    try {
        const {
            taskName,
            taskPriority,
            taskDesciption,
            taskDue,
            taskOwner,
            taskKanban,
            taskImageUrl,
            taskUrl,
        } = args.taskItem
        const taskItem = new TaskItem({
            taskName,
            taskPriority,
            taskDesciption,
            taskDue,
            taskOwner,
            taskKanban,
            taskImageUrl,
            taskUrl,
        })
        const newTaskItem = await taskItem.save()
        return { ...newTaskItem._doc, _id: newTaskItem.id }
    } catch (e) {
        console.log(`Error creating TaskItem -> ${e}`)
        throw e
    }
}

export const createComment = async (args, Comment) => {
    try {
        const {
            commentText,
            commentOwner,
        } = args.comment
        const comment = new Comment({
            commentText,
            commentOwner,
        })
        const newComment = await comment.save()
        return { ...newComment._doc, _id: newComment.id }
    } catch (e) {
        console.log(`Error creating comment -> ${e}`)
        throw e
    }
}
