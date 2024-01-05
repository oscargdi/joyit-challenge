import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt.guard';
import { SetRateDto } from './dto/set-rate.dto';
import { RateService } from './rate.service';

@Controller('rate')
@ApiTags('exchange')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class RateController {
  @Inject()
  private readonly rateService: RateService;

  @Post()
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Rate set' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async setRate(@Body() data: SetRateDto) {
    return this.rateService.setRate(data);
  }
}
