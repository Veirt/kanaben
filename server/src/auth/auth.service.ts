import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signToken(user: User) {
    const accessToken = await this.jwtService.signAsync({ sub: user.id });

    return accessToken;
  }
}
