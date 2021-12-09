import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import typeDefs from './schema/schema.mjs'
import resolvers from './resolvers/resolvers.mjs'

import connect from './utils/db.mjs'
import Auth from './utils/Auth.mjs'

dotenv.config()

// Connect to MongoDB
connect()

const app = express()

const frontBaseUrl = process.env.FRONT_BASE_URL

const corsOptions = {
    credentials: true,
    origin: frontBaseUrl
}

app.use(cookieParser())

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    cors: corsOptions,
    context: Auth,
    playground: process.env.NODE_ENV === 'development' ? true : false,
    introspection: true,
    tracing: true,
    path: '/',
})

await server.start()

server.applyMiddleware({
    app,
    cors: corsOptions,
    path: '/dashboard',
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
