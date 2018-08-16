// [ERROR]: The addResolveFunctionsToSchema function takes named options now; see IAddResolveFunctionsToSchemaOptions
import "reflect-metadata";
import * as fs from 'fs';
import * as path from 'path';
import { port } from './config';
import { importSchema } from 'graphql-import';
import { GraphQLServer } from 'graphql-yoga';
import { createTypeormConnection } from './utils/createConnection';
import { GraphQLSchema, GraphQLError } from 'graphql';
import { makeExecutableSchema, mergeSchemas } from 'graphql-tools';

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

// [REMINDER]: To be used when extending Error becomes possible
// const formatError = (error: any) => ({
//       message: error.message,
//       state: error.originalError && error.originalError.state,
//       locations: error.locations,
//       path: error.path
// });

const formatError = (error: GraphQLError) => {
      const { type, errors } = JSON.parse(error.message);
      const extensions = { code: type };
      const message = JSON.stringify(errors);
      return { ...error, extensions, message };
};


export const startServer = async () => {
      const server = new GraphQLServer({ schema: getSchema() });
      await createTypeormConnection();1
      const app = await server.start({ port, formatError });
      console.log(`Server is running on localhost:${port}`);
      return app;
};