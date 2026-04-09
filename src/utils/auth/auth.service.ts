import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(userId: string, login: string): Promise<string> {
    const payload = { sub: userId, login };
    return this.jwtService.sign(payload);
  }
}
