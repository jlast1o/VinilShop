// src/orders/order.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDto) {
    return await this.orderService.createOrder(dto);
  }

  @Get(':id')
  async getOrderById(@Param('id') orderId: string) {
    const numericClientId = parseInt(orderId, 10); // Преобразование строки в число
    return await this.orderService.getOrderById(numericClientId);
  }

  @Get('client/:clientId')
  async getOrdersByClientId(@Param('clientId') clientId: string) {
    const numericClientId = parseInt(clientId, 10); // Преобразование строки в число
    return await this.orderService.getOrdersByClientId(numericClientId);
  }

  @Get()
  async getAllOrders() {
    return await this.orderService.getAllOrders();
  }

  @Put(':id')
  async updateOrder(@Param('id') orderId: string, @Body() updateData: Partial<CreateOrderDto>) {
    const numericClientId = parseInt(orderId, 10); // Преобразование строки в число
    return await this.orderService.updateOrder(numericClientId, updateData);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') orderId: string) {
    const numericClientId = parseInt(orderId, 10); // Преобразование строки в число
    return await this.orderService.deleteOrder(numericClientId);
  }
}
