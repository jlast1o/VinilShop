import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma.service';
import { OrderedProductsService } from 'src/ordered-products/ordered-products.service';
import { OrderedProductsModule } from 'src/ordered-products/ordered-products.module';

@Module({
  imports: [OrderedProductsModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService, OrderedProductsService],
  exports: [OrderService]
})
export class OrderModule {}
