import { User } from '../../entity/User';
import { request } from 'graphql-request';
import { startServer } from '../../startServer';
import { tryCatchWrapper } from '../../utils/testUtils';
import { VALIDATION_ERROR } from '../../config/errorTypes';
import { emailAlreadyTaken, emailTooShort, invalidEmail, passwordTooShort } from '../../config/messages';

let host: string;
// allow to test the error thrown without a try-catch
const req = tryCatchWrapper(request);

beforeAll(async () => {
      const app = await startServer();
      const { port }: any = app.address();
      host = `http://127.0.0.1:${port}`;
});

test("Register user", async () => {
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

// !! Depends on previous test !!
test('Prevents registering new user with existing email address', async () => {
      const email = 'test@test.com';
      const password = 'test9238409z';
      const mutation = `mutation { register(email:"${email}", password:"${password}"){ id, email }}`;
      // register same email as in previous test
      const error = await req(host, mutation);
      expect(error.extensions.code).toEqual(VALIDATION_ERROR);
      const { path, message } = JSON.parse(error.message)[0];
      expect(path).toEqual('email');
      expect(message).toEqual(emailAlreadyTaken);
});

test('Returns error if user enters invalid email', async () => {
      const email = 'to';
      const password = 'test9238409z';
      const mutation = `mutation { register(email:"${email}", password:"${password}"){ id, email }}`;
      const error = await req(host, mutation);
      expect(error.extensions.code).toEqual(VALIDATION_ERROR);
      const message = JSON.parse(error.message);
      expect(message[0].path).toEqual('email');
      expect(message[0].message).toEqual(emailTooShort);
      expect(message[1].path).toEqual('email');
      expect(message[1].message).toEqual(invalidEmail);
});

test('Returns error if user enters invalid password', async () => {
      const email = 'test2@test.com';
      const password = 'te';
      const mutation = `mutation { register(email:"${email}", password:"${password}"){ id, email }}`;
      const error = await req(host, mutation);
      expect(error.extensions.code).toEqual(VALIDATION_ERROR);
      const message = JSON.parse(error.message);
      expect(message[0].path).toEqual('password');
      expect(message[0].message).toEqual(passwordTooShort);
});

