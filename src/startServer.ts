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
// import { formatError } from "apollo-errors";
// import ValidationError from './utils/validationError';

const schemas: GraphQLSchema[] = [];

const getSchema = () => {
      // get all module directories
      const modules = fs.readdirSync(path.join(__dirname, './modules'));
      // loop thru directories to get resolvers and type defs from each
      modules.forEach(m => {
            const { resolvers } = require(`./modules/${m}/resolvers`);
            const typeDefs = importSchema(path.join(__dirname, `./modules/${m}/schema.graphql`));
            schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
      });
      return mergeSchemas({ schemas });
};

const formatError = (error: any) => {
      const err = error.originalError.errors[0];
      console.log('>>>>', err, err instanceof Error);
      return {
            message: error.message,
            state: error.originalError && error.originalError.state,
            locations: error.locations,
            path: error.path
      }
};

export const startServer = async () => {
      const server = new GraphQLServer({ schema: getSchema() });
      await createTypeormConnection();
      const app = await server.start({ port, formatError });
      console.log(`Server is running on localhost:${port}`);
      return app;
};