import { Module } from '@nestjs/common';
import { EuProductModule } from './eu-product/eu-product.module';
import { RuProductModule } from './ru-product/ru-product.module';
import { ClientModule } from './client/client.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UserBasketModule } from './user-basket/user-basket.module';
import { OrderedProductsModule } from './ordered-products/ordered-products.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ConfigModule.forRoot(), EuProductModule, RuProductModule, ClientModule, UserBasketModule, OrderedProductsModule, OrderModule],
  controllers: [],
  providers: [PrismaService],
  exports: [ PrismaService],
})
export class AppModule {}
