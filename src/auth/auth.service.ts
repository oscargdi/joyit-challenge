import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(inputUsername: string, inputPassword: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(inputUsername);

    if (!user) {
      throw new UnauthorizedException();
    }

    const match = await bcrypt.compare(inputPassword, user.password);
    if (!match) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
