import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt.guard';
import { ResultRequestDto } from './dto/result-request.dto';
import { ResultResponseDto } from './dto/result-response.dto';
import { ResultService } from './result.service';

@Controller('result')
@ApiTags('exchange')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ResultController {
  @Inject()
  private readonly resultService: ResultService;

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The result of the conversion',
    type: ResultResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async getResult(@Query() data: ResultRequestDto): Promise<ResultResponseDto> {
    return this.resultService.getResult(data);
  }
}
