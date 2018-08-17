import { ObjectSchema } from 'yup';
import { ValidationError } from './errors';
import { abortEarlyOnValidationError } from '../config';

export const yupValidate = async (arg: any, schema: ObjectSchema<{}>) => {
    try {
        await schema.validate(arg, { abortEarly: abortEarlyOnValidationError });
        return null;
    } catch (err) {
        if (abortEarlyOnValidationError) {
            throw new ValidationError([{ path: err.path, message: err.errors }]);
        }
        const errors: Array<{ path: string, message: string }> = [];
        err.inner.forEach(({ path, message }: { path: string, message: string }) => {
            errors.push({ path, message });
        });
        throw new ValidationError(errors);
    }
  };