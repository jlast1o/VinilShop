import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService, private readonly authService: AuthService) {}

  @Post('create')
    async create(@Body() createClientDto: CreateClientDto) {
    const { accessToken, refreshToken } = await this.authService.generateTokens(createClientDto);
    return { accessToken, refreshToken };
  }


  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch('/edit/:id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
