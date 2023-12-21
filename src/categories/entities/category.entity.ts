import { Category } from 'kysely/kysely-types';

export type CategoryEntity = Omit<Category, 'updated_at'>;
