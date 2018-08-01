import "reflect-metadata";
import { resolvers } from './resolvers';
import { GraphQLServer } from 'graphql-yoga';
import { createConnection } from 'typeorm';

const typeDefs = './src/schema.graphql';

const server = new GraphQLServer({ typeDefs, resolvers });
createConnection().then(() => {
      server.start(() => console.log('Server is running on localhost:4000'));
});