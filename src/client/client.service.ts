import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    const { username, password, role, number, address, location, email, contactInfo } = createClientDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    return this.prisma.clients.create({
      data: {
        username,
        password : hashedPassword,  // Используем закодированный пароль
        role,
        number,
        address,
        location,
        email,
        contactInfo
      }
    });
  }

  async findAll() {
    return this.prisma.clients.findMany();
  }

  async findOne(id: number) {
    const client = await this.prisma.clients.findUnique({
      where: { clientId: id }
    });

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.prisma.clients.update({
      where: { clientId: id },
      data: updateClientDto,
    });

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    return client;
  }

  async remove(id: number) {

    await this.prisma.userBasket.deleteMany({
      where: { clientId: id },
    });

    
    const client = await this.prisma.clients.delete({
      where: { clientId: id },
    });

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    return client;
  }
}