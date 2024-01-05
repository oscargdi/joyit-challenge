import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { Cache } from 'cache-manager';
import { RateService } from './rate.service';

describe('RateService', () => {
  let service: RateService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RateService,
        {
          provide: CACHE_MANAGER,
          useValue: { set: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<RateService>(RateService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('setRate', () => {
    it('should set rate', async () => {
      const data = {
        from: 'USD',
        to: 'EUR',
        value: 1.2,
      };
      const result = await service.setRate(data);
      expect(result).toBeUndefined();
      expect(cacheManager.set).toHaveBeenCalledWith('USD_EUR', data.value, 0);
    });
  });
});
