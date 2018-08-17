export const port = process.env.NODE_ENV === 'test' ? 0 : 4000;
export const abortEarlyOnValidationError = process.env.ABORT_EARLY_ON_VALIDATION_ERROR === 'true';
