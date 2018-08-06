// [ERROR]: The addResolveFunctionsToSchema function takes named options now; see IAddResolveFunctionsToSchemaOptions
import "reflect-metadata";
import * as fs from 'fs';
import * as path from 'path';
import { port } from './config';
import { importSchema } from 'graphql-import';
import { GraphQLServer } from 'graphql-yoga';
import { GraphQLSchema } from 'graphql';
import { createTypeormConnection } from './utils/createConnection';
import { makeExecutableSchema, mergeSchemas } from 'graphql-tools';

export const startServer = async () => {
      const schemas: GraphQLSchema[] = [];
      const modules = fs.readdirSync(path.join(__dirname, './modules'));
      modules.forEach(m => {
            const { resolvers } = require(`./modules/${m}/resolvers`);
            const typeDefs = importSchema(path.join(__dirname, `./modules/${m}/schema.graphql`));
            schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
      });
      const server = new GraphQLServer({ schema: mergeSchemas({ schemas })});
      await createTypeormConnection();
      const app = await server.start({ port });
      console.log(`Server is running on localhost:${port}`);
      return app;
};