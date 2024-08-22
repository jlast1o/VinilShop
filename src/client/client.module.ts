import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService, PrismaService],
  exports: [ClientService]
})
export class ClientModule {}
