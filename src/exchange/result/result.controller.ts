import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ResultRequestDto } from './dto/result-request.dto';
import { ResultResponseDto } from './dto/result-response.dto';
import { ResultService } from './result.service';

@Controller('result')
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
