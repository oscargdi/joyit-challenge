import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ResultRequestDto } from './dto/result-request.dto';
import { ResultResponseDto } from './dto/result-response.dto';

@Injectable()
export class ResultService {
  @Inject(CACHE_MANAGER)
  private readonly cacheService: Cache;

  async getResult(data: ResultRequestDto): Promise<ResultResponseDto> {
    const key = `${data.from}_${data.to}`;
    const rate = await this.cacheService.get<number>(key);

    if (!rate) {
      throw new Error('Rate not found');
    }

    const result = data.amount * rate;

    return {
      from: data.from,
      to: data.to,
      amount: data.amount,
      result,
      rate,
    };
  }
}
