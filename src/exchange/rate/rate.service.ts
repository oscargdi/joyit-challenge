import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { UpdateRateDto } from './dto/update-rate.dto';

@Injectable()
export class RateService {
  @Inject(CACHE_MANAGER)
  private readonly cacheService: Cache;

  async setRate(data: UpdateRateDto): Promise<void> {
    const key = `${data.from}_${data.to}`;
    await this.cacheService.set(key, data.value, 0);
  }
}
