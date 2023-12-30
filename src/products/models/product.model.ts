export interface ProductModel {
  id: string;
  category_id: string;
  name: string;
  description: string;
  details: Record<string, unknown> | unknown | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
