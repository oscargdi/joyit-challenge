import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Currency } from '../../common/exchange-currency';

export class ResultResponseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Currency code to convert from',
    enum: Currency,
    example: Currency.USD,
  })
  from: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Currency code to convert to',
    enum: Currency,
    example: Currency.EUR,
  })
  to: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Amount to convert',
    example: 42,
  })
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Result of the conversion',
    example: 50.4,
  })
  result: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Rate used for the conversion',
    example: 1.2,
  })
  rate: number;
}
