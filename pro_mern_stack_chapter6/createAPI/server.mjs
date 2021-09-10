import express from 'express'
import { ApolloServer, UserInputError } from 'apollo-server-express'
import { GraphQLScalarType } from 'graphql'
// Doesn't work with /language
import { Kind } from 'graphql'
import { MongoClient } from 'mongodb'
import fs from 'fs'

// %40 = @
const url = 'mongodb+srv://filewalker:dxu7mbp1pqw_DZR%40enj@cluster0.fpmyd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

let db

let aboutMessage = "Issue Tracker API v1.0"

const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A Date() type in GraphQL as a scalar',
    serialize(value) {
        return value.toISOString();
    },
    parseValue(value) {
        const dateValue = new Date(value)
        return isNaN(dateValue) ? undefined : dataValue;
    },
    parseLiteral(ast) {
        if (ast.kind == Kind.STRING) {
            const value = new Date(ast.value);
            return isNaN(value) ? undefined : value
        }
    }
})

const issueList = async () => {
    const issues = await db.collection('issues').find({}).toArray()
    return issues
}

const resolvers = {
    Query: {
        about: () => aboutMessage,
        issueList,
    },
    Mutation: {
        setAboutMessage,
        issueAdd,
    },
    GraphQLDate,
}

// Book Error! Reference error! It's not validateIssue!
// Book Error! Parameter is just issue, nothing more!
function issueValidate(issue) {
    const errors = []
    if (issue.title.length < 3) {
        errors.push('Do not be that lazy!')
    }
    if (issue.status == 'Assigned' && !issue.owner) {
        errors.push('So to whom it is assigned then?!')
    }
    if (errors.length > 0) {
        throw new UserInputError('Invalid input(s)', { errors })
    }
}

function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}

const connectToDb = async () => {
    const client = new MongoClient(url, { useNewUrlParser: true })
    await client.connect()
    console.log(`🚀 Connected to MongoDB 🚀 at ${url}`)
    db = client.db()
}

const getNextSequence = async name => {
    const result = await db.collection('counters').findOneAndUpdate(
        { _id: name },
        { $inc: { current: 1 } },
        { returnOriginal: false }
    )
    return result.value.current
}

async function issueAdd(_, { issue }) {
    issueValidate(issue)
    issue.created = new Date()
    issue.id = await getNextSequence('issues')
    const result = await db.collection('issues').insertOne(issue)
    const savedIssue = await db.collection('issues')
        .findOne({ _id: result.insertedId })
    return savedIssue
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
    resolvers,
    formatError: error => {
        console.log(error)
        return error
    }
})

await server.start() // Added this line to make it work with @3 - Newest version

const app = express()

server.applyMiddleware({ app, path: '/graphql' })

app.use(express.static('public'))

;(async function () {
    try {
        await connectToDb()
        app.listen(3000, () => {
            console.log('App started on port 3000')
        })
    } catch(err) {
        console.log(`:( Error -> ${err})`)
    }
})()