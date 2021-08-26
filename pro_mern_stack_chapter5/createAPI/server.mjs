import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { GraphQLScalarType } from 'graphql'
// Doesn't work with /language
import { Kind } from 'graphql'
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

const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A Date() type in GraphQL as a scalar',
    serialize(value) {
        return value.toISOString();
    },
    parseValue(value) {
        return new Date(value)
    },
    parseLiteral(ast) {
        return (ast.kind == Kind.STRING) ? new Date(ast.value) : undefined
    }
});

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
};

function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}

function issueList() {
    return issuesDB;
}

function issueAdd(_, { issue }) {
    issue.created = new Date()
    issue.id = issuesDB.length + 1
    if (issue.status == undefined) issue.status = 'New'
    issuesDB.push(issue)
    return issue
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