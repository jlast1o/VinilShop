import { Module } from '@nestjs/common';
import { RuProductService } from './ru-product.service';
import { RuProductController } from './ru-product.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RuProductController],
  providers: [RuProductService, PrismaService],
  exports: [RuProductService]
})
export class RuProductModule {}
