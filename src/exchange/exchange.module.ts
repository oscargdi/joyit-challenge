import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RateController } from './rate/rate.controller';
import { RateService } from './rate/rate.service';
import { ResultController } from './result/result.controller';
import { ResultService } from './result/result.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [RateController, ResultController],
  providers: [RateService, ResultService],
})
export class ExchangeModule {}
