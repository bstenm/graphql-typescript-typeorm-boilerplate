import * as yup from 'yup';
import { emailTooShort, emailInvalidFormat } from '../../config/messages';

export const yupSchema = yup.object().shape({
      email: yup
            .string()
            .min(3, emailTooShort)
            .max(255)
            .email(emailInvalidFormat),
      password: yup
            .string()
            .min(3)
            .max(255)
});