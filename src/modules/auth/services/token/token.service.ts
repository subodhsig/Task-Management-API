import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface AccessTokenPayload {
  sub: number;
  email: string;
}

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(payload: AccessTokenPayload): string {
    return this.jwtService.sign(payload);
  }
}
