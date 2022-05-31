/* eslint-disable */
// Apparently this isn't used anywhere!
import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};
  err.inner.forEach(error => {
    if (error.path) {
      validationErrors[error.path] = error.message;
    } else {
      throw new Error(`Error ${error} has no path property.`);
    }
  });
  return validationErrors;
}
