import { Module } from '@nestjs/common';
import { RuProductService } from './ru-product.service';
import { RuProductController } from './ru-product.controller';

@Module({
  controllers: [RuProductController],
  providers: [RuProductService],
})
export class RuProductModule {}
