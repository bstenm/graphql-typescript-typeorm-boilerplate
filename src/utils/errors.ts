import ExtendableError from 'extendable-error';

export class ValidationError extends ExtendableError {
      state: any
      constructor(errors: any) {
            // [REMINDER]: Do that until Error type is fully extendable in typescript
            super(JSON.stringify(errors));
            // [REMINDER]: Does not work until Error type is fully extendable in typescript
            this.state = errors.reduce((result: any, error: any) => {
                  if (Object.prototype.hasOwnProperty.call(result, error.key)) {
                        result[error.key].push(error.message);
                  } else {
                        result[error.key] = [error.message];
                  }
                  return result;
            }, {});
      }
}
