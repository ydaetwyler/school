import { ApolloServer } from 'apollo-server-express'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

import typeDefs from './schema/schema.mjs'
import resolvers from './resolvers/resolvers.mjs'

import connect from './utils/db.mjs'

// Connect to MongoDB
connect()

dotenv.config()

const app = express()

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    cors: true,
    playground: process.env.NODE_ENV === 'development' ? true : false,
    introspection: true,
    tracing: true,
    path: '/',
})

await server.start()

server.applyMiddleware({
    app,
    path: '/',
    cors: true,
    onHealthCheck: () => {
        new Promise((resolve, reject) => {
            (mongoose.connection.readyState > 0)
            ? resolve()
            : reject()
        })
    }
})

app.listen({ port: process.env.PORT }, () => {
    console.log(`
        🚀  Server is running!
        🔉  Listening on port ${process.env.PORT}
        📭  Query at https://studio.apollographql.com/dev
    `)
})
