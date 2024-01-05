import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  @Inject()
  private readonly usersService: UsersService;

  @Inject()
  private readonly jwtService: JwtService;

  async signIn(inputUsername: string, inputPassword: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(inputUsername);

    if (!user) {
      throw new UnauthorizedException();
    }

    const match = await bcrypt.compare(inputPassword, user.password);
    if (!match) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
