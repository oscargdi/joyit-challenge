import { Test, TestingModule } from '@nestjs/testing';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';

describe('RateController', () => {
  let controller: RateController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: RateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RateController],
      providers: [{ provide: RateService, useValue: { setRate: jest.fn() } }],
    }).compile();

    controller = module.get<RateController>(RateController);
    service = module.get<RateService>(RateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('setRate', () => {
    it('should set rate', async () => {
      const data = {
        from: 'USD',
        to: 'EUR',
        value: 1.2,
      };
      const result = await controller.setRate(data);
      expect(service.setRate).toHaveBeenCalledWith(data);
      expect(result).toBeUndefined();
    });
  });
});
