import { TestBed } from '@automock/jest';
import {
  PRODUCTS_REPOSITORY_PORT,
  ProductsRepository,
} from './ports/products-repository.port';
import { ProductsService } from './products.service';
import {
  CATEGORIES_REPOSITORY_PORT,
  CategoriesRepository,
} from '../categories/ports/categories-repository.port';
import { ProductEntity } from './entities/product.entity';
import { InternalException } from '../exception-handling/internal.exception';
import { FindAllProductsInput } from './interfaces/find-all-products-input.interface';
import { beforeEach } from 'node:test';
import { CreateProductInput } from './interfaces/create-product-input.interface';
import {
  UpdateProductInput,
  UpdateProductServiceInput,
} from './interfaces/update-product-input.interface';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: jest.Mocked<ProductsRepository>;
  let categoryRepository: jest.Mocked<CategoriesRepository>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(ProductsService).compile();

    service = unit;
    repository = unitRef.get<ProductsRepository>(PRODUCTS_REPOSITORY_PORT);
    categoryRepository = unitRef.get<CategoriesRepository>(
      CATEGORIES_REPOSITORY_PORT,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    const defaultId = '9adb629b-7769-450e-b5fc-9545443a3c9f';

    const defaultMock = {
      id: defaultId,
      name: 'Livro Incrível',
      description: 'Uma história rica e fantástica',
      details: null,
      created_at: new Date('2023-12-30T12:35:48.091Z'),
      updated_at: new Date('2023-12-30T12:35:48.091Z'),
      deleted_at: null,
      price: 4500,
      category_id: '635182b6-6f29-449b-86bc-896fecd6efb6',
      category_name: 'Livros',
      category_description: 'Livros e E-books',
    };

    const {
      updated_at,
      category_id,
      category_name,
      category_description,
      ...rest
    } = defaultMock;

    const defaultResponse: ProductEntity = {
      ...rest,
      category_id,
      category: {
        id: category_id,
        name: category_name,
        description: category_description,
      },
    };

    afterEach(() => {
      repository.findById.mockReset();
    });

    it('should be defined', () => {
      expect(service.findById).toBeDefined();
    });

    it('should throw 207 exception because a unexpected failure occurred', async () => {
      repository.findById.mockRejectedValue(new Error());

      expect(
        async () => await service.findById(defaultId),
      ).rejects.toStrictEqual(new InternalException(207));
      expect(repository.findById).toHaveBeenCalledTimes(1);
    });

    it('should throw 201 exception because the product was not found', async () => {
      repository.findById.mockResolvedValue(null);

      expect(
        async () => await service.findById(defaultId),
      ).rejects.toStrictEqual(new InternalException(201));
      expect(repository.findById).toHaveBeenCalledTimes(1);
    });

    it('should return a single product', async () => {
      repository.findById.mockResolvedValue(defaultMock);

      const response = await service.findById(defaultId);
      expect(response).toStrictEqual(defaultResponse);
      expect(repository.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('list', () => {
    const defaultMock = [
      {
        id: '9adb629b-7769-450e-b5fc-9545443a3c9f',
        name: 'Livro Incrível',
        description: 'Uma história rica e fantástica',
        details: null,
        created_at: new Date('2023-12-30T12:35:48.091Z'),
        updated_at: new Date('2023-12-30T12:35:48.091Z'),
        deleted_at: null,
        price: 4500,
        category_id: '635182b6-6f29-449b-86bc-896fecd6efb6',
        category_name: 'Livros',
        category_description: 'Livros e E-books',
      },
      {
        id: '6203a564-d531-401b-8a43-332bc9f72394',
        name: 'Livro Incrível 2',
        description: 'Uma história rica e fantástica',
        details: null,
        created_at: new Date('2023-12-30T12:35:48.091Z'),
        updated_at: new Date('2023-12-30T12:35:48.091Z'),
        deleted_at: null,
        price: 4750,
        category_id: '635182b6-6f29-449b-86bc-896fecd6efb6',
        category_name: 'Livros',
        category_description: 'Livros e E-books',
      },
      {
        id: 'dce7e379-fd27-43ff-9056-a6f0876b9d03',
        name: 'Smart Watch',
        description: 'Smart Watch de última geração',
        details: {
          garantia: 12,
          seguro: true,
        },
        created_at: new Date('2024-01-02T13:53:26.805Z'),
        updated_at: new Date('2024-01-02T13:53:26.805Z'),
        deleted_at: null,
        price: 26798,
        category_id: '5993c05d-485a-49bb-b60b-45566b3c22e2',
        category_name: 'Acessórios',
        category_description: 'Relógios, jóias, óculos e muito mais',
      },
    ];

    const defaultResponse: ProductEntity[] = defaultMock.map((e) => {
      const {
        updated_at,
        category_id,
        category_name,
        category_description,
        ...rest
      } = e;

      return {
        ...rest,
        category_id,
        category: {
          id: category_id,
          name: category_name,
          description: category_description,
        },
      };
    });

    afterEach(() => {
      repository.findAll.mockReset();
    });

    it('should be defined', () => {
      expect(service.list).toBeDefined();
    });

    it('should throw 202 exception because a unexpected failure occurred', async () => {
      repository.findAll.mockRejectedValue(new Error());

      expect(async () => await service.list()).rejects.toStrictEqual(
        new InternalException(202),
      );
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw 203 exception because min_price is greater than max_price', async () => {
      expect(
        async () =>
          await service.list({
            min_price: 2000,
            max_price: 1000,
          }),
      ).rejects.toStrictEqual(new InternalException(203));
      expect(repository.findAll).toHaveBeenCalledTimes(0);
    });

    it('should list all products', async () => {
      repository.findAll.mockResolvedValue(defaultMock);

      const response = await service.list();

      expect(response).toStrictEqual(defaultResponse);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should list and paginate the return, showing just the second element', async () => {
      repository.findAll.mockResolvedValue([defaultMock[1]]);

      const response = await service.list({
        skip: 1,
        take: 1,
      });

      expect(response).toStrictEqual([defaultResponse[1]]);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should list filtering the response, just returning the books', async () => {
      repository.findAll.mockResolvedValue(defaultMock.slice(0, 1));

      const response = await service.list({
        category_id: '635182b6-6f29-449b-86bc-896fecd6efb6',
      });

      expect(response).toStrictEqual(defaultResponse.slice(0, 1));
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    const defaultInput: CreateProductInput = {
      id: '9adb629b-7769-450e-b5fc-9545443a3c9f',
      category_id: '635182b6-6f29-449b-86bc-896fecd6efb6',
      name: 'Livro Incrível',
      description: 'Uma história rica e fantástica',
      details: null,
      price: 4500,
    };

    const defaultMock = {
      id: '9adb629b-7769-450e-b5fc-9545443a3c9f',
      name: 'Livro Incrível',
      description: 'Uma história rica e fantástica',
      details: null,
      created_at: new Date('2023-12-30T12:35:48.091Z'),
      updated_at: new Date('2023-12-30T12:35:48.091Z'),
      deleted_at: null,
      price: 4500,
      category_id: '635182b6-6f29-449b-86bc-896fecd6efb6',
      category_name: 'Livros',
      category_description: 'Livros e E-books',
    };

    const mockCategoryResponse = {
      id: '635182b6-6f29-449b-86bc-896fecd6efb6',
      name: 'Livros',
      description: 'Livros e E-books',
      created_at: new Date('2023-12-22T17:53:25.783Z'),
      updated_at: new Date('2023-12-22T17:53:25.783Z'),
      deleted_at: null,
    };

    const {
      updated_at,
      category_id,
      category_name,
      category_description,
      ...rest
    } = defaultMock;

    const defaultResponse: ProductEntity = {
      ...rest,
      category_id,
      category: {
        id: category_id,
        name: category_name,
        description: category_description,
      },
    };

    afterEach(() => {
      categoryRepository.findById.mockReset();
      repository.create.mockReset();
      repository.findById.mockReset();
    });

    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should throw 101 exception because the informed category does not exists', async () => {
      categoryRepository.findById.mockResolvedValue(null);

      expect(
        async () => await service.create(defaultInput),
      ).rejects.toStrictEqual(new InternalException(101));
      expect(categoryRepository.findById).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledTimes(0);
    });

    it('should throw 204 exception because a unexpected failure occurred', async () => {
      categoryRepository.findById.mockResolvedValue(mockCategoryResponse);
      repository.create.mockRejectedValue(new Error());

      expect(
        async () => await service.create(defaultInput),
      ).rejects.toStrictEqual(new InternalException(204));
      expect(categoryRepository.findById).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledTimes(0);
    });

    it('should create a product', async () => {
      categoryRepository.findById.mockResolvedValue(mockCategoryResponse);
      repository.create.mockResolvedValue(defaultMock);
      repository.findById.mockResolvedValue(defaultMock);

      await service.create(defaultInput);

      const response = await service.findById(defaultInput.id);

      expect(response).toStrictEqual(defaultResponse);
      expect(categoryRepository.findById).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    const defaultInput: UpdateProductInput = {
      id: '9adb629b-7769-450e-b5fc-9545443a3c9f',
      data: {
        name: 'Uma Aventura Fantástica',
        description: 'Uma aventura rica e fantástica',
        details: {
          genero: 'Aventura',
          editora: 'Livros',
          autor: 'John Doe',
        },
        price: 4800,
        updated_at: new Date('2024-01-02T13:53:26.805Z'),
      },
    };

    const defaultMock = {
      id: defaultInput.id,
      name: 'Uma Aventura Fantástica',
      description: 'Uma aventura rica e fantástica',
      details: {
        genero: 'Aventura',
        editora: 'Livros',
        autor: 'John Doe',
      },
      price: 4800,
      updated_at: new Date('2024-01-02T13:53:26.805Z'),
      created_at: new Date('2023-12-30T12:35:48.091Z'),
      deleted_at: null,
      category_id: '635182b6-6f29-449b-86bc-896fecd6efb6',
      category_name: 'Livros',
      category_description: 'Livros e E-books',
    };

    const {
      updated_at,
      category_id,
      category_name,
      category_description,
      ...rest
    } = defaultMock;

    const defaultResponse: ProductEntity = {
      ...rest,
      category_id,
      category: {
        id: category_id,
        name: category_name,
        description: category_description,
      },
    };

    afterEach(() => {
      repository.update.mockReset();
    });

    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should throw 205 exception because a unexpected failure occurred', async () => {
      repository.update.mockRejectedValue(new Error());

      expect(
        async () => await service.update(defaultInput),
      ).rejects.toStrictEqual(new InternalException(205));
      expect(repository.create).toHaveBeenCalledTimes(0);
    });

    it('should update a product', async () => {
      repository.update.mockResolvedValue(defaultMock);

      const response = await service.update(defaultInput);

      expect(response).toStrictEqual(defaultResponse);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    const defaultId = '9adb629b-7769-450e-b5fc-9545443a3c9f';

    const defaultMock = {
      id: defaultId,
      name: 'Livro Incrível',
      description: 'Uma história rica e fantástica',
      details: null,
      created_at: new Date('2023-12-30T12:35:48.091Z'),
      updated_at: new Date('2023-12-30T12:35:48.091Z'),
      deleted_at: new Date('2024-01-02T13:53:26.805Z'),
      price: 4500,
      category_id: '635182b6-6f29-449b-86bc-896fecd6efb6',
      category_name: 'Livros',
      category_description: 'Livros e E-books',
    };

    afterEach(() => {
      repository.findById.mockReset();
      repository.update.mockRestore();
    });

    it('should be defined', () => {
      expect(service.delete).toBeDefined();
    });

    it('should throw 206 exception because a unexpected failure occurred', async () => {
      repository.update.mockRejectedValue(new Error());

      expect(async () => await service.delete(defaultId)).rejects.toStrictEqual(
        new InternalException(206),
      );
      expect(repository.update).toHaveBeenCalledTimes(1);
    });

    it('should delete a single product', async () => {
      repository.update.mockResolvedValue(defaultMock);
      repository.findById.mockResolvedValue(null);

      await service.delete(defaultId);
      expect(
        async () => await service.findById(defaultId),
      ).rejects.toStrictEqual(new InternalException(201));

      expect(repository.update).toHaveBeenCalledTimes(1);
      expect(repository.findById).toHaveBeenCalledTimes(1);
    });
  });
});
