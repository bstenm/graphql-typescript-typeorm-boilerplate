import * as yup from 'yup';
import { emailTooShort, invalidEmail } from '../../config/messages';

export const yupSchema = yup.object().shape({
      email: yup
            .string()
            .min(3, emailTooShort)
            .max(255)
            .email(invalidEmail),
      password: yup
            .string()
            .min(3)
            .max(255)
});