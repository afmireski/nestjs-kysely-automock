import { TestBed } from '@automock/jest';
import { CategoriesService } from './categories.service';
import {
  CATEGORIES_REPOSITORY_PORT,
  CategoriesRepository,
} from './ports/categories-repository.port';
import { InternalException } from '../exception-handling/internal.exception';

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
});
