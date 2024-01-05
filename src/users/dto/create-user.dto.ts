import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The username of the User', example: 'oscargdi' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The password of the User', example: '123456' })
  password: string;
}
