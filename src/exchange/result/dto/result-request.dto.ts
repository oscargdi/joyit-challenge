import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Currency } from '../../common/exchange-currency';

export class ResultRequestDto {
  @IsNotEmpty()
  @IsEnum(Currency)
  @ApiProperty({
    description: 'Currency code to convert from',
    enum: Currency,
    example: Currency.USD,
  })
  from: string;

  @IsNotEmpty()
  @IsEnum(Currency)
  @ApiProperty({
    description: 'Currency code to convert to',
    enum: Currency,
    example: Currency.EUR,
  })
  to: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @ApiProperty({
    description: 'Amount to convert',
    example: 42,
  })
  amount: number;
}
