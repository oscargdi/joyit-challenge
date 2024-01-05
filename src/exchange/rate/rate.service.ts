import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { SetRateDto } from './dto/set-rate.dto';

@Injectable()
export class RateService {
  @Inject(CACHE_MANAGER)
  private readonly cacheService: Cache;

  async setRate(data: SetRateDto): Promise<void> {
    const key = `${data.from}_${data.to}`;
    await this.cacheService.set(key, data.value, 0);
  }
}
