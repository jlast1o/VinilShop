import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ClientService } from "src/client/client.service";
import { CreateClientDto } from "src/client/dto/create-client.dto";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly clientService: ClientService) {}

  async generateTokens(createClientDto: CreateClientDto) {
    const user = await this.clientService.create(createClientDto);
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    return { accessToken, refreshToken };
  }

  async generateAccessToken(user: any) {
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.sign(payload, {
      secret: 'access-secret',
      expiresIn: '1h',
    });
  }

  async generateRefreshToken(user: any) {
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.sign(payload, {
      secret: 'refresh-secret',
      expiresIn: '7d',
    });
  }

  async refreshToken(refreshToken: string) {
    const user = await this.jwtService.verify(refreshToken, {
      secret: 'refresh-secret',
    });
    return this.generateAccessToken(user);
  }
}
