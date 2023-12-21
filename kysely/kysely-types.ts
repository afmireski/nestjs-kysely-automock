import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Category = {
  id: string;
  name: string;
  description: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
};
export type Product = {
  id: string;
  category_id: string;
  name: string;
  description: string;
  details: unknown | null;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
};
export type ProductPrice = {
  product_id: string;
  created_at: Generated<Timestamp>;
  value: number;
};
export type DB = {
  categories: Category;
  product_prices: ProductPrice;
  products: Product;
};
