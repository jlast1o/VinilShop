import { Module } from '@nestjs/common';
import { EuProductModule } from './eu-product/eu-product.module';
import { RuProductModule } from './ru-product/ru-product.module';
import { ClientModule } from './client/client.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), EuProductModule, RuProductModule, ClientModule],
  controllers: [],
  providers: [PrismaService],
  exports: [ PrismaService],
})
export class AppModule {}
