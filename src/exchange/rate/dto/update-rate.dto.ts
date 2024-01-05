import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Currency } from '../../common/exchange-currency';

export class UpdateRateDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(Currency)
  @ApiProperty({
    description: 'Currency from which the rate is updated',
    enum: Currency,
    example: Currency.USD,
  })
  from: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Currency)
  @ApiProperty({
    description: 'Currency to which the rate is updated',
    enum: Currency,
    example: Currency.EUR,
  })
  to: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Rate value', example: 1.2 })
  value: number;
}
