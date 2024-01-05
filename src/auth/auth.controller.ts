import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthTokenDto } from './dto/auth-token.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get a token to interact with the API using your credentials',
  })
  @ApiResponse({
    status: 200,
    description: 'The token has been successfully retrieved.',
    type: AuthTokenDto,
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
