import "reflect-metadata";
import resolvers from './resolvers';
import { GraphQLServer } from 'graphql-yoga'

const typeDefs = './src/schema.graphql';

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'));