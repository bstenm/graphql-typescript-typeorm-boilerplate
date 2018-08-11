import { ObjectSchema } from 'yup';

export const yupValidate = async (arg: any, schema: ObjectSchema<{}>) => {
      try {
          await schema.validate(arg, { abortEarly: false });
          return null;
      } catch (err) {
          const errors: Array<{ path: string, message: string }> = [];
          err.inner.forEach(({ path, message }: { path: string, message: string }) => {
              errors.push({ path, message });
          });
          return errors;
      }
  };