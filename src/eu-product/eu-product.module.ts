import { Module } from '@nestjs/common';
import { EuProductService } from './eu-product.service';
import { EuProductController } from './eu-product.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EuProductController],
  providers: [EuProductService, PrismaService],
  exports: [EuProductService]
})
export class EuProductModule {}
