// src/user-basket/user-basket.controller.ts
import { Controller, Post, Delete, Get, Param, Body } from '@nestjs/common';
import { UserBasketService } from './user-basket.service';

@Controller('basket')
export class UserBasketController {
  constructor(private readonly userBasketService: UserBasketService) {}

  @Post('add')
  async addItem(@Body() body: { clientId: number; productId: number; productType: 'ru' | 'eu' }) {
    return this.userBasketService.addItem(body.clientId, body.productId, body.productType);
  }

  @Delete('remove')
  async removeItem(@Body() body: { clientId: number; productId: number; productType: 'ru' | 'eu' }) {
    return this.userBasketService.removeItem(body.clientId, body.productId, body.productType);
  }

  @Get(':clientId')
  async getUserBasket(@Param('clientId') clientId: string) {
    return this.userBasketService.getUserBasket(parseInt(clientId, 10));
  }
}
