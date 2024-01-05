import { ApiProperty } from '@nestjs/swagger';

export class AuthTokenDto {
  @ApiProperty({ description: 'The token has been successfully retrieved.' })
  accessToken: string;
}
