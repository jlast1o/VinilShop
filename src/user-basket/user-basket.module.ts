import { Module } from '@nestjs/common';
import { UserBasketService } from './user-basket.service';
import { UserBasketController } from './user-basket.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserBasketController],
  providers: [UserBasketService, PrismaService],
  exports: [UserBasketService]
})
export class UserBasketModule {}
