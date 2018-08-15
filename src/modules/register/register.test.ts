import { User } from '../../entity/User';
import { request } from 'graphql-request';
import { startServer } from '../../startServer';
import { emailAlreadyTaken, emailTooShort, emailInvalidFormat } from '../../config/messages';

let host: string;

beforeAll(async () => {
      const app = await startServer();
      const { port }: any = app.address();
      host = `http://127.0.0.1:${port}`;
});

test.only("Register user", async () => {
      const email = 'test@test.com';
      const password = 'test9238409';
      const mutation = `mutation { register(email:"${email}", password:"${password}"){ id, email }}`;
      const response = await request(host, mutation);
      const users = await User.find({ where: { email }});
      expect(users).toHaveLength(1);
      const user = users[0];
      expect(user.email).toEqual(email);
      // password has been hashed
      expect(user.password).not.toEqual(password);
      expect(response).toEqual({ register: { email, id: user.id }});
});

test.only('Prevents registering new user with existing email address', async () => {
            const email = 'test@test.com';
            const password = 'test9238409z';
            const mutation = `mutation { register(email:"${email}", password:"${password}"){ id, email }}`;
            // register same email as in previous test
            await request(host, mutation);
            // expect(error.register).toHaveLength(1);
            // expect(error.register[0].message).toEqual(emailAlreadyTaken);
            // expect(error.register[0].path).toEqual('email');
      });

test('Returns error if email has an invalid format', async () => {
      const email = 'to';
      const password = 'test9238409z';
      const mutation = `mutation { register(email:"${email}", password:"${password}"){ id, email }}`;
      const error: any = await request(host, mutation);
      expect(error.register).toHaveLength(2);
      expect(error.register[0].path).toEqual('email');
      expect(error.register[0].message).toEqual(emailTooShort);
      expect(error.register[1].path).toEqual('email');
      expect(error.register[1].message).toEqual(emailInvalidFormat);
});

