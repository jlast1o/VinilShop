import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderedProductsService } from './ordered-products.service';
import { CreateOrderedProductDto } from './dto/create-ordered-product.dto';
import { UpdateOrderedProductDto } from './dto/update-ordered-product.dto';

@Controller('ordered-products')
export class OrderedProductsController {
  constructor(private readonly orderedProductsService: OrderedProductsService) {}

  @Get(':id')
  async getOrderedProduct(@Param('id') id: string) {
    const numericClientId = parseInt(id, 10); // Преобразование строки в число
    return await this.orderedProductsService.findOne(numericClientId);
  }

  @Get('order/:orderId')
  async getOrderedProductsByOrderId(@Param('orderId') orderId: string) {
    const numericClientId = parseInt(orderId, 10); // Преобразование строки в число
    return await this.orderedProductsService.findByOrderId(numericClientId);
  }

  @Get()
  async getAllOrderedProducts() {
    return this.orderedProductsService.findAll();
  }

  @Patch(':id')
  async updateOrderedProduct(@Param('id') id: string, @Body() updateDto: UpdateOrderedProductDto) {
    const numericClientId = parseInt(id, 10); // Преобразование строки в число
    return await this.orderedProductsService.update(numericClientId, updateDto);
  }

  @Delete(':id')
  async deleteOrderedProduct(@Param('id') id: string) {
    const numericClientId = parseInt(id, 10); // Преобразование строки в число
    return await this.orderedProductsService.delete(numericClientId);
  }

  @Delete('order/:orderId')
  async deleteOrderedProductsByOrderId(@Param('orderId') orderId: string) {
    const numericClientId = parseInt(orderId, 10); // Преобразование строки в число
    return await this.orderedProductsService.deleteByOrderId(numericClientId);
  }

 
}
