import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import fs from 'fs'

let aboutMessage = "Issue Tracker API v1.0"

const issuesDB = [
    {
        id: 1, status: 'New', owner: 'Ravan', effort: 5,
        created: new Date('2021-08-26'), due: undefined,
        title: 'Error in Error while Error, the whole WorlErrorErrorErrord',
    },
    {
        id: 2, status: 'Assigned', owner: 'EddieMurphy', effort: 14,
        created: new Date('2021-08-24'), due: new Date ('2021-09-25'),
        title: 'Missing bottom border on earth',
    },
];

const resolvers = {
    Query: {
        about: () => aboutMessage,
        issueList,
    },
    Mutation: {
        setAboutMessage,
    },
};

function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}

function issueList() {
    return issuesDB;
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
    resolvers,
});

await server.start(); // Added this line to make it work with @3 - Newest version

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, () => {
    console.log('App started on port 3000');
});