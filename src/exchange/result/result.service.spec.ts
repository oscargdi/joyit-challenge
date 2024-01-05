import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import { ResultService } from './result.service';

describe('ResultService', () => {
  let service: ResultService;
  let cacheService: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResultService,
        { provide: CACHE_MANAGER, useValue: { get: jest.fn() } },
      ],
    }).compile();

    service = module.get<ResultService>(ResultService);
    cacheService = module.get<Cache>(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getResult', () => {
    it('should return the result of the conversion', async () => {
      jest.spyOn(cacheService, 'get').mockResolvedValueOnce(1.2);

      const result = await service.getResult({
        from: 'USD',
        to: 'EUR',
        amount: 42,
      });

      expect(cacheService.get).toHaveBeenCalledWith('USD_EUR');
      expect(result).toEqual({
        from: 'USD',
        to: 'EUR',
        amount: 42,
        result: 50.4,
        rate: 1.2,
      });
    });

    it('should throw an error if the rate is not found', async () => {
      jest.spyOn(cacheService, 'get').mockResolvedValueOnce(undefined);

      await expect(
        service.getResult({
          from: 'USD',
          to: 'EUR',
          amount: 42,
        }),
      ).rejects.toThrow('Rate not found');
      expect(cacheService.get).toHaveBeenCalledWith('USD_EUR');
    });
  });
});
