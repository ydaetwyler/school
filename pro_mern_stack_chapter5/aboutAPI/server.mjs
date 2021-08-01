import express from 'express'
import { ApolloServer } from 'apollo-server-express'

let aboutMessage = "Issue Tracker API v1.0"

const typeDefs = `
    type Query {
        about: String
    }
    type Mutation {
        setAboutMessage(message: String!): String
    }
`;

const resolvers = {
    Query: {
        about: () => aboutMessage,
    },
    Mutation: {
        setAboutMessage,
    },
};

function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

await server.start(); // Added this line to make it work with @3 - Newest version

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, () => {
    console.log('App started on port 3000');
});