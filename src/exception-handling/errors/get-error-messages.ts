import { InternalMessage } from '../internal.exception';
import categoriesErrors from './100-categories.errors';

export function getErrorMessages(code: number): InternalMessage {
  if (code < 100) {
    return { httpCode: 500, code: -1, message: 'Um erro inesperado ocorreu' };
  } else if (code < 200) {
    const { httpCode, message } = categoriesErrors[code];
    return { httpCode, code, message };
  }
}
