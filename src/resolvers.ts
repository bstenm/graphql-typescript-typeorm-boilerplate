import { User } from './entity/User';
import { GQL } from './types/schema.d';
import * as bcryptjs from 'bcryptjs';
import { ResolverMap } from './types/graphql.utils.d';

export const resolvers: ResolverMap =  {
        Query: {
            hello: (_, { name }: GQL.IHelloOnQueryArguments) => `Hey ${name || 'World'}`,
        },
        Mutation: {
            register: async (_, { email, password }: GQL.IRegisterOnMutationArguments) => {
                const hashedPassword = await bcryptjs.hash(password, 10);
                const user = User.create({ email, password: hashedPassword });
                await user.save()
                return true;
            }
        }
  };