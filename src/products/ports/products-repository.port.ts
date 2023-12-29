export interface ProductsRepository {
  findById(input): Promise<any>;

  findAll(input): Promise<any>;

  create(input): Promise<any>;

  update(input): Promise<any>;

  delete(input): Promise<any>;
}
