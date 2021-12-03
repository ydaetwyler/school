import { gql } from 'apollo-server-express'

const typeDefs = gql`

    scalar Date

    type Query {
        "Get family Object with all needed subfields"
        load: [Family!]!
        getFamily(hash: String!): Family
        getFamilyHash(id: ID!): String
        getUser(hash: String!): User
        avatarList(id: ID!): AvatarList
        eventItem(hash: String!): EventItem
        activityImageList(id: ID!): ActivityImageList
        collectionList(id: ID!): CollectionList
        taskItem(id: ID!): TaskItem
        taskImageList(id: ID!): TaskImageList
        comment(hash: String!): Comment
    }

    type Mutation {
        signUp(username: String!,
        email: String!, 
        password: String!, 
        familyHash: String!,
        avatarUrl: String): String
        signIn(email: String!, password: String!): String
        createFamily(familyName: String!): String
        updateAvatarImage(userHash: String!, avatarImageUrl: String!): User
        updateFamilyName(familyHash: String!, familyName: String!): Family
        updateUserName(userHash: String!, userName: String): User
        createEventItem(
            activityName: String!,
            activityImageUrl: String,
            activityDate: Date,
            activityOwner: String,
            activityDescription: String,
            activityLocation: String,
            activityUrl: String,
            familyHash: String!
        ): EventItem
        updateEventItem(
            activityName: String,
            activityImageUrl: String,
            activityDate: Date,
            activityOwner: String,
            activityDescription: String,
            activityLocation: String,
            activityUrl: String,
            eventItemHash: String!
        ): EventItem
        removeEventItem(eventItemHash: String!, familyHash: String!): Family
        createEventComment(
            eventItemHash: String!,
            commentText: String!,
            commentOwner: String!
        ): EventItem
        removeEventComment(commentHash: String!): EventItem
    }

    "Family is the main object"
    type Family {
        _id: ID
        familyName: String
        familyMemberNames: [String]
        familyMemberHash: [String]
        eventList: [EventItem]
        collectionList: [CollectionList]
        hash: String
    }

    "One user"
    type User {
        _id: ID
        userEmail: String
        userName: String
        password: String
        familyHash: String
        hash: String
        avatarUrl: String
        avatarList: AvatarList
    }

    "Avatar image list"
    type AvatarList {
        avatarUrl: [String]
    }

    "An event item"
    type EventItem {
        _id: ID
        hash: String
        activityName: String
        activityImageUrl: String
        activityDate: Date
        participantsList: [String]
        activityOwner: String
        activityDescription: String
        activityLocation: String
        activityUrl: String
        activityImageList: ActivityImageList
        comments: [Comment]
    }

    "Event images list"
    type ActivityImageList {
        activityImageUrl: [String]
    }

    "List containing all collections"
    type CollectionList {
        collectionName: String
        collectionIconUrl: String
        tasks: [TaskItem]
    }

    "Task item"
    type TaskItem {
        _id: ID
        taskName: String
        taskPriorities: [String]
        taspPriority: String
        taskDescription: String
        taskDue: Date
        taskCreated: Date
        taskOwner: String!
        taskResponsibles: [String]
        taskKanbanList: [String]
        taskKanban: String
        taskImageUrl: String
        taskUrl: String
        taskImageList: TaskImageList
        comments: [Comment]
    }

    "Task image list"
    type TaskImageList {
        taskImageUrl: [String]
    }

    "Comment can be used in Events and Tasks"
    type Comment {
        _id: ID
        hash: String
        commentText: String
        commentOwner: String
        commentDate: Date
    }
`

export default typeDefs