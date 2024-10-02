import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateClientDto } from 'src/client/dto/create-client.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create')
  async create(@Body() createClientDto: CreateClientDto) {
  const { accessToken, refreshToken } = await this.authService.generateTokens(createClientDto);
  return { accessToken, refreshToken };
}

}
