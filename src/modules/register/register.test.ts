import { User } from '../../entity/User';
import { request } from 'graphql-request';
import { startServer } from '../../startServer';
import { emailAlreadyTaken } from '../../config/messages';

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

test('Prevents registering new user with existing email address', async () => {
      try {
            await request(host, mutation);
      } catch (err) {
            const { message } = err.response.errors[0];
            expect(message).toEqual(emailAlreadyTaken);
      }
});
