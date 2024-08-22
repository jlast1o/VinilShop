import { Module } from '@nestjs/common';
import { OrderedProductsService } from './ordered-products.service';
import { OrderedProductsController } from './ordered-products.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [OrderedProductsController],
  providers: [OrderedProductsService, PrismaService],
  exports: [OrderedProductsService]
})
export class OrderedProductsModule {}
