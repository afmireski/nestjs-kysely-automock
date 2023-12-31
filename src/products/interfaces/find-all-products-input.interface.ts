import { Pagination } from '../../global/interfaces/pagination';

export interface FindAllProductsInput extends Pagination {
  category_id?: string;
  name?: string;
  min_price?: number;
  max_price?: number;
}
