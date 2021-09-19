import { gql } from 'apollo-server'

const typeDefs = gql`

    type Query {
        "Get family Object with all needed subfields"
        currentFamily: [Family!]!
    }

    "Family is the main object"
    type Family {
        _id: ID!
        familyName: String!
        currentUser: String!
        familyMemberList: [FamilyMemberList]!
        eventList: [EventItem]!
        collectionList: [CollectionList]!
    }

    "A list of family members"
    type FamilyMemberList {
        users: [user]!
    }

    "One user"
    type User {
        _id: ID!
        userEmail: String!
        userName: String!
        avatarUrl: String
        avatarList: [avatarList]!
    }

    "Avatar image list"
    type avatarList {
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
        comments: [comment]
    }

    "Event images list"
    type ActivityImageList {
        activityImageUrl: [String]
    }

    "List containing all collections"
    type CollectionList {
        collectionName: String!
        collectioIconUrl: String
        tasks: [tasItem]!
    }

    "Task item"
    type TaskItem {
        _id: ID!
        taskName: String!
        taskPriority: [String]!
        taskDescription: String
        taskDue: Date
        taskOwner: String!
        taskResponsibles: [String]
        taskKanban: [String]
        taskImageUrl: String
        taskUrl: String
        taskImageList: [TaskImageList]!
        familyMemberList: [familyMemberList]!
        comments: [comment]
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