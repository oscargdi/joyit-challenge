import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UpdateRateDto } from './dto/update-rate.dto';
import { RateService } from './rate.service';

@Controller('rate')
export class RateController {
  @Inject()
  private readonly rateService: RateService;

  @Post()
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Rate updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async setRate(@Body() data: UpdateRateDto) {
    return this.rateService.setRate(data);
  }
}
