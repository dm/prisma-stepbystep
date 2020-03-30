const { importSchema } = require('graphql-import');
const { GraphQLServer } = require('graphql-yoga');
const { resolvers } = require('resolvers');
const { Prisma } = require('../prisma/generated/prisma');
require('dotenv/config');

const typeDefs = importSchema('src/schemas/store.graphql');

export const db = new Prisma({
  endpoint: process.env.PRISMA_ENDPOINT || 'http://localhost:4488',
  secret: process.env.PRISMA_SECRET || '',
});

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: async () => ({
        prisma: db,
    }),
});

server.start(
    {
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
      },
      port: process.env.PORT 
    }, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});