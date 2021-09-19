import { gql } from 'apollo-server-express'

const typeDefs = gql`

    scalar Date

    type Query {
        "Get family Object with all needed subfields"
        family: [Family!]!
    }

    "Family is the main object"
    type Family {
        _id: ID!
        familyName: String!
        familyMemberList: [FamilyMemberList]!
        eventList: [EventItem]!
        collectionList: [CollectionList]!
    }

    "A list of family members"
    type FamilyMemberList {
        users: [User]!
    }

    "One user"
    type User {
        _id: ID!
        userEmail: String!
        userName: String!
        avatarUrl: String
        avatarList: [AvatarList]!
    }

    "Avatar image list"
    type AvatarList {
        avatarUrl: [String]
    }

    "An event item"
    type EventItem {
        _id: ID!
        activityName: String!
        activityImageUrl: String
        activityDate: Date!
        participantsList: [String]
        activityOwner: String!
        activityCreated: Date!
        activityDescription: String
        activityLocation: String
        activityUrl: String
        activityImageList: [ActivityImageList]!
        familyMemberList: [FamilyMemberList]!
        comments: [Comment]
    }

    "Event images list"
    type ActivityImageList {
        activityImageUrl: [String]
    }

    "List containing all collections"
    type CollectionList {
        collectionName: String!
        collectionIconUrl: String
        tasks: [TaskItem]!
    }

    "Task item"
    type TaskItem {
        _id: ID!
        taskName: String!
        taskPriorities: [String]!
        taspPriority: String!
        taskDescription: String
        taskDue: Date
        taskCreated: Date
        taskOwner: String!
        taskResponsibles: [String]
        taskKanbanList: [String]
        taskKanban: String
        taskImageUrl: String
        taskUrl: String
        taskImageList: [TaskImageList]!
        familyMemberList: [FamilyMemberList]!
        comments: [Comment]
    }

    "Task image list"
    type TaskImageList {
        taskImageUrl: [String]
    }

    "Comment can be used in Events and Tasks"
    type Comment {
        _id: ID!
        commentText: String!
        commentOwner: String!
        commentDate: Date!
    }
`

export default typeDefs