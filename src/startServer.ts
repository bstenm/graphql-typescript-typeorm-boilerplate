import "reflect-metadata";
import { port } from './config';
import { resolvers } from './resolvers';
import { GraphQLServer } from 'graphql-yoga';
import { createTypeormConnection } from './utils/createConnection';

export const startServer = async () => {
      const typeDefs = './src/schema.graphql';
      const server = new GraphQLServer({ typeDefs, resolvers });
      await createTypeormConnection();
      const app = await server.start({ port });
      console.log(`Server is running on localhost:${port}`);
      return app;
};