import { createConnection, getConnectionOptions } from 'typeorm';

export const createTypeormConnection = async () => {
      const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
      debugger;
      await createConnection({ ...connectionOptions, name: "default" });
}