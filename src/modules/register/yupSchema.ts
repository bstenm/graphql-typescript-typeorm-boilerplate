import * as yup from 'yup';
import { emailTooShort, invalidEmail, passwordTooShort } from '../../config/messages';

export const yupSchema = yup.object().shape({
      email: yup
            .string()
            .min(3, emailTooShort)
            .max(255)
            .email(invalidEmail),
      password: yup
            .string()
            .min(3, passwordTooShort)
            .max(255)
});