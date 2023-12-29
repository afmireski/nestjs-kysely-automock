import { TestBed } from '@automock/jest';
import { CategoriesService } from './categories.service';
import {
  CATEGORIES_REPOSITORY_PORT,
  CategoriesRepository,
} from './ports/categories-repository.port';
import { InternalException } from '../exception-handling/internal.exception';
import { CreateCategoryInput } from './interfaces/create-category-input.interface';
import { UpdateCategoryInput } from './interfaces/update-category-input.interface';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: jest.Mocked<CategoriesRepository>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(CategoriesService).compile();

    service = unit;
    repository = unitRef.get<CategoriesRepository>(CATEGORIES_REPOSITORY_PORT);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    const defaultId = '0e47224b-f44c-44af-a6b2-744780d97638';
    const mockResponse = {
      id: '0e47224b-f44c-44af-a6b2-744780d97638',
      name: 'Games',
      description: 'Coisas relacionadas a games',
      created_at: new Date('2023-12-22T17:53:25.783Z'),
      updated_at: new Date('2023-12-22T17:53:25.783Z'),
      deleted_at: null,
    };
    const defaultResponse = {
      id: '0e47224b-f44c-44af-a6b2-744780d97638',
      name: 'Games',
      description: 'Coisas relacionadas a games',
      created_at: new Date('2023-12-22T17:53:25.783Z'),
      deleted_at: null,
    };

    it('should find a category', async () => {
      repository.findById.mockResolvedValue(mockResponse);

      const response = await service.findById(defaultId);
      expect(repository.findById).toHaveBeenCalled();
      expect(response).toStrictEqual(defaultResponse);
    });

    it('should throw 101 exception because a category was not found', async () => {
      repository.findById.mockResolvedValue(null);

      expect(
        async () => await service.findById(defaultId),
      ).rejects.toStrictEqual(new InternalException(101));
      expect(repository.findById).toHaveBeenCalled();
    });

    it('should throw 102 exception because a unexpected failure occurred', async () => {
      repository.findById.mockRejectedValue(new Error());

      expect(
        async () => await service.findById(defaultId),
      ).rejects.toStrictEqual(new InternalException(102));
      expect(repository.findById).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    const defaultInput: CreateCategoryInput = {
      id: '0e47224b-f44c-44af-a6b2-744780d97638',
      name: 'Games',
      description: 'Coisas relacionadas a games',
    };

    const mockResponse = {
      id: '0e47224b-f44c-44af-a6b2-744780d97638',
      name: 'Games',
      description: 'Coisas relacionadas a games',
      created_at: new Date('2023-12-22T17:53:25.783Z'),
      updated_at: new Date('2023-12-22T17:53:25.783Z'),
      deleted_at: null,
    };

    const defaultResponse = {
      id: '0e47224b-f44c-44af-a6b2-744780d97638',
      name: 'Games',
      description: 'Coisas relacionadas a games',
      created_at: new Date('2023-12-22T17:53:25.783Z'),
      deleted_at: null,
    };

    it('should create a category', async () => {
      repository.create.mockResolvedValue(mockResponse);
      repository.findById.mockResolvedValue(mockResponse);

      await service.create(defaultInput);
      expect(repository.create).toHaveBeenCalled();

      expect(await service.findById(defaultInput.id)).toStrictEqual(
        defaultResponse,
      );
    });

    it('should throw 103 exception because a failure occurred while try to create a category', async () => {
      repository.create.mockRejectedValue(new Error());

      expect(
        async () => await service.create(defaultInput),
      ).rejects.toStrictEqual(new InternalException(103));
      expect(repository.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    const mockResponse = [
      {
        id: '0e47224b-f44c-44af-a6b2-744780d97638',
        name: 'Games',
        description: 'Coisas relacionadas a games',
        created_at: new Date('2023-12-22T17:53:25.783Z'),
        updated_at: new Date('2023-12-22T17:53:25.783Z'),
        deleted_at: null,
      },
      {
        id: '635182b6-6f29-449b-86bc-896fecd6efb6',
        name: 'Livros',
        description: 'Livros e E-books',
        created_at: new Date('2023-12-28 16:40:18.613-0300'),
        updated_at: new Date('2023-12-28 16:40:18.613-0300'),
        deleted_at: null,
      },
      {
        id: '96fc05e2-9f1f-4c35-b5db-3c3d4463332f',
        name: 'Roupas',
        description: 'Artigos de vestimenta',
        created_at: new Date('2023-12-23 10:04:23.712-0300'),
        updated_at: new Date('2023-12-23 10:04:23.712-0300'),
        deleted_at: null,
      },
    ];

    const defaultResponse = [
      {
        id: '0e47224b-f44c-44af-a6b2-744780d97638',
        name: 'Games',
        description: 'Coisas relacionadas a games',
        created_at: new Date('2023-12-22T17:53:25.783Z'),
        deleted_at: null,
      },
      {
        id: '635182b6-6f29-449b-86bc-896fecd6efb6',
        name: 'Livros',
        description: 'Livros e E-books',
        created_at: new Date('2023-12-28 16:40:18.613-0300'),
        deleted_at: null,
      },
      {
        id: '96fc05e2-9f1f-4c35-b5db-3c3d4463332f',
        name: 'Roupas',
        description: 'Artigos de vestimenta',
        created_at: new Date('2023-12-23 10:04:23.712-0300'),
        deleted_at: null,
      },
    ];

    it('should list all categories', async () => {
      repository.findAll.mockResolvedValue(mockResponse);

      const response = await service.list();
      expect(repository.findAll).toHaveBeenCalled();
      expect(response).toStrictEqual(defaultResponse);
    });

    it('should list just the second category', async () => {
      repository.findAll.mockResolvedValue([mockResponse[1]]);

      const response = await service.list({ skip: 1, take: 1 });
      expect(repository.findAll).toHaveBeenCalled();
      expect(response).toStrictEqual([defaultResponse[1]]);
    });

    it('should throw 104 exception because a unexpected failure occurred', async () => {
      repository.findAll.mockRejectedValue(new Error());

      expect(async () => await service.list()).rejects.toStrictEqual(
        new InternalException(104),
      );
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    beforeEach(() => {
      repository.findById.mockReset();
      repository.update.mockReset();
    });

    const defaultInput: UpdateCategoryInput = {
      id: '0e47224b-f44c-44af-a6b2-744780d97638',
      name: 'Livros',
      description: 'Livros e E-books',
    };

    const mockResponses: any[] = [
      {
        id: '0e47224b-f44c-44af-a6b2-744780d97638',
        name: 'Games',
        description: 'Coisas relacionadas a games',
        created_at: new Date('2023-12-22T17:53:25.783Z'),
        updated_at: new Date('2023-12-22T17:53:25.783Z'),
        deleted_at: null,
      },
      {
        ...defaultInput,
        created_at: new Date('2023-12-22T17:53:25.783Z'),
        updated_at: new Date('2023-12-29T12:00:00.000Z'),
        deleted_at: null,
      },
    ];
    const defaultResponse = {
      ...defaultInput,
      created_at: new Date('2023-12-22T17:53:25.783Z'),
      deleted_at: null,
    };

    it('should update a category', async () => {
      repository.findById.mockResolvedValue(mockResponses[0]);
      repository.update.mockResolvedValue(mockResponses[1]);

      const response = await service.update(defaultInput);
      expect(repository.findById).toHaveBeenCalled();
      expect(repository.update).toHaveBeenCalled();
      expect(response).toStrictEqual(defaultResponse);
    });

    it('should throw 101 exception because the category was not found', async () => {
      repository.findById.mockResolvedValue(null);

      expect(
        async () => await service.update(defaultInput),
      ).rejects.toStrictEqual(new InternalException(101));
      expect(repository.findById).toHaveBeenCalled();
      expect(repository.update).not.toHaveBeenCalled();
    });

    it('should throw 105 exception because a unexpected failure occurred', async () => {
      repository.findById.mockResolvedValue(mockResponses[0]);
      repository.update.mockRejectedValue(new Error());

      expect(
        async () => await service.update(defaultInput),
      ).rejects.toStrictEqual(new InternalException(105));
      expect(repository.findById).toHaveBeenCalled();
      expect(repository.update).not.toHaveBeenCalled();
    });
  });
});
