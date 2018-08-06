import { User } from '../../entity/User';
import { GQL } from '../../types/schema.d';
import * as bcryptjs from 'bcryptjs';
import { ResolverMap } from '../../types/graphql.utils.d';
import { emailAlreadyTaken } from '../../config/messages';

export const resolvers: ResolverMap =  {
    // [TODO]: temporary Query root to prevent error from bug in schema stitching
        Query: {
            bye: () => 'Yo'
        },
        Mutation: {
            register: async (_, { email, password }: GQL.IRegisterOnMutationArguments) => {
                const userAlreadyExists = await User.findOne({ where: { email }});
                if (userAlreadyExists) throw new Error(emailAlreadyTaken);
                const hashedPassword = await bcryptjs.hash(password, 10);
                const user = User.create({ email, password: hashedPassword });
                await user.save()
                return true;
            }
        }
  };