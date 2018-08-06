import { User } from '../entity/User';
import { request } from 'graphql-request';
import { startServer } from '../startServer';

let host: string;
const email = 'test@test.com';
const password = 'test9238409';
const mutation = `mutation { register(email:"${email}", password:"${password}")}`;

beforeAll(async () => {
      const app = await startServer();
      const { port }: any = app.address();
      host = `http://127.0.0.1:${port}`;
});

test("Register user", async () => {
     const response = await request(host, mutation);
      expect(response).toEqual({ register: true});
      const users = await User.find({ where: { email }});
      expect(users).toHaveLength(1);
      const user = users[0];
      expect(user.email).toEqual(email);
      expect(user.password).not.toEqual(password);
});
