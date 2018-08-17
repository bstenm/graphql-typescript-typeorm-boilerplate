import { GraphQLError } from 'graphql';
import { ValidationErrorType } from '../types/errors.d';
import { VALIDATION_ERROR } from '../config/errorTypes';

// [REMINDER]: To be used when extending Error becomes possible
// export class ValidationError extends GraphQLError {
//       state: any
//       constructor(errors: Array<ValidationErrorType>) {
//             super('The request is invalid.');
//             Object.setPrototypeOf(this, ValidationError.prototype);
//             this.state = errors.reduce((result: any, error: any) => {
//                   if (Object.prototype.hasOwnProperty.call(result, error.key)) {
//                         result[error.key].push(error.message);
//                   } else {
//                         result[error.key] = [error.message];
//                   }
//                   return result;
//             }, {});
//       }
// }

export class ValidationError extends GraphQLError {
      constructor(errors: Array<ValidationErrorType>) {
            super(JSON.stringify({ type: VALIDATION_ERROR, errors }));
      }
};