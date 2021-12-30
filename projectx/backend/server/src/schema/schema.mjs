import { gql } from 'apollo-server-express'

const typeDefs = gql`

    scalar Date

    type Query {
        "Get family Object with all needed subfields"
        getFamily: Family,
        getUser: User,
    }

    type Mutation {
        signUp(
            username: String!,
            email: String!, 
            password: String!,
            userHash: String!,
            avatarUrl: String!
        ): String
        signIn(email: String!, password: String!): String
        createFamily(familyName: String!, familyAvatarUrl: String!): String
        invite(_id: ID, email: String!): String
        lostPassword(email: String!): String
        resetPassword(password: String!, userHash: String!): String
        updateFamily(_id: ID, familyName: String, familyAvatarUrl: String): Family
        updateUser(username: String, avatarUrl: String): User
        createEventItem(
            activityName: String!,
            activityImageUrl: String,
            activityDate: Date,
            activityDescription: String,
            activityLocation: String,
            activityUrl: String,
            familyHash: String!
        ): EventItem
        setCoordinates(_id: ID, coordinates: String): String
        setWeather(
            _id: ID, 
            activityApiLastCall: Date,  
            activityWeatherIcon: String,
            activityWeatherTemp: String,
            activityWeatherDesc: String,
            activityWeatherSunrise: String,
            activityWeatherSunset: String,
            activityWeatherWind: String
        ): String
        updateEventItem(
            activityName: String,
            activityImageUrl: String,
            activityDate: Date,
            activityDescription: String,
            activityLocation: String,
            activityUrl: String,
        ): EventItem
        removeEventItem(eventItemHash: String!, familyHash: String!): Family
        createEventComment(
            eventItemHash: String!,
            commentText: String!,
            commentOwner: String!
        ): EventItem
        removeEventComment(commentHash: String!): EventItem
    }

    type Subscription {
        familyChanged(_id: ID!): Family
    }

    "Family is the main object"
    type Family {
        _id: ID
        familyName: String
        familyAvatarUrl: String
        familyMembers: [User]
        eventList: [EventItem]
        collectionList: [CollectionList]
    }

    "One user"
    type User {
        _id: ID
        userEmail: String
        userName: String
        password: String
        hash: String
        active: Boolean
        avatarUrl: String
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
        activityCoordinates: String
        activityApiCityNotFound: Boolean
        activityApiLastCall: Date
        activityWeatherIcon: String
        activityWeatherTemp: String
        activityWeatherDesc: String
        activityWeatherSunrise: String
        activityWeatherSunset: String
        activityWeatherWind: String
        activityAddress: String
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
        commentOwner: User
        commentDate: Date
    }
`

export default typeDefs