import { GetByStringId } from '../interfaces/get-by-id.types';
import * as Validator from 'class-validator';

export class GetByUUID implements GetByStringId {
  @Validator.IsUUID('4')
  id: string;
}
