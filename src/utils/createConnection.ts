import { createConnection, getConnectionOptions } from 'typeorm';

export const createTypeormConnection = async () => {
      const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
      // [TODO]: Why do we need to overwrite name to "default"?
      await createConnection({ ...connectionOptions, name: "default" });
}