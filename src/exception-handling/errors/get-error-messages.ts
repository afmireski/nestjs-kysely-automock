import { InternalMessage } from '../internal.exception';
import categoriesErrors from './100-categories.errors';
import productsErrors from './200-products.errors copy';

export function getErrorMessages(code: number): InternalMessage {
  if (code < 100) {
    return { httpCode: 500, code: -1, message: 'Um erro inesperado ocorreu' };
  } else if (code < 200) {
    const { httpCode, message } = categoriesErrors[code];
    return { httpCode, code, message };
  } else if (code < 300) {
    const { httpCode, message } = productsErrors[code];
    return { httpCode, code, message };
  } else {
    return {
      httpCode: 500,
      code: 0,
      message: 'Um erro ainda não mapeado foi lançado',
    };
  }
}
