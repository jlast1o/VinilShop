// src/orders/order.service.ts
import { Injectable } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma.service';
import { OrderedProductsService } from 'src/ordered-products/ordered-products.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,  
    private readonly orderedProductsService: OrderedProductsService) {}

  async createOrder(dto: CreateOrderDto) {
    const order = await this.prisma.order.create({
      data: {
        clientId: dto.clientId,
        nameOfOrder: dto.nameOfOrder,
        status: 'В обработке',
        dateOfBuy: new Date(),
        dateOfPreorder: new Date(),
        dateOfFullPay: new Date(),
      },
    });
    await this.orderedProductsService.processOrderedProducts(dto.clientId, order.orderId);

    return order;
  }



  async getOrderById(orderId: number) {
    return await this.prisma.order.findUnique({
      where: { orderId },
    });
  }

  async getOrdersByClientId(clientId: number) {
    return await this.prisma.order.findMany({
      where: { clientId },
    });
  }

  async getAllOrders() {
    return await this.prisma.order.findMany();
  }

  async updateOrder(orderId: number, updateData: Partial<CreateOrderDto>) {
    return await this.prisma.order.update({
      where: { orderId },
      data: updateData,
    });
  }

  async deleteOrder(orderId: number) {
    return await this.prisma.order.delete({
      where: { orderId },
    });
  }
}
