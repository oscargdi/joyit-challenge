import { Test, TestingModule } from '@nestjs/testing';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';

describe('ResultController', () => {
  let controller: ResultController;
  let service: ResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResultController],
      providers: [
        { provide: ResultService, useValue: { getResult: jest.fn() } },
      ],
    }).compile();

    controller = module.get<ResultController>(ResultController);
    service = module.get<ResultService>(ResultService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getResult', () => {
    it('should return the result of the conversion', async () => {
      const request = {
        from: 'USD',
        to: 'EUR',
        amount: 42,
      };
      const response = {
        from: 'USD',
        to: 'EUR',
        amount: 42,
        result: 50.4,
        rate: 1.2,
      };

      jest.spyOn(service, 'getResult').mockResolvedValueOnce(response);

      const result = await controller.getResult(request);

      expect(service.getResult).toHaveBeenCalledWith(request);
      expect(result).toEqual(response);
    });
  });
});
