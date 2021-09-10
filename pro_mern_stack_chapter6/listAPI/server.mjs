import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { GraphQLScalarType } from 'graphql'
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
    },
    GraphQLDate,
}

function setAboutMessage(_, { message }) {
    return aboutMessage = message
}

const connectToDb = async () => {
    const client = new MongoClient(url, { useNewUrlParser: true })
    await client.connect()
    console.log(`🚀 Connected to MongoDB 🚀 at ${url}`)
    db = client.db()
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
    resolvers,
})

await server.start() // Added this line to make it work with @3 - Newest version

const app = express()

server.applyMiddleware({ app, path: '/graphql' })

app.use(express.static('public'))

(async function () {
    try {
        await connectToDb()
        app.listen(3000, () => {
            console.log('App started on port 3000')
        })
    } catch(err) {
        console.log(`:( Error -> ${err})`)
    }
})()
