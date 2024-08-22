import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class UserBasketService {
  constructor(private prisma: PrismaService) {}

  async addItem(clientId: number, productId: number, productType: 'ru' | 'eu') {
    if (productId == null) {
      throw new Error('Product ID must be provided');
    }
  
    if (clientId == null) {
      throw new Error('Client ID must be provided');
    }
  
    console.log('Adding item to basket:', { clientId, productId, productType });
  
    if (productType === 'ru') {
      const productExists = await this.prisma.ruProduct.findUnique({
        where: { ruProductId: productId },
      });
  
      if (!productExists) {
        throw new Error('RuProduct not found');
      }
  
      return this.prisma.userBasket.create({
        data: {
          clientId,
          ruProductId: productId,
          euProductId: null,  // Ensure this field is null for 'ru' products
        },
      });
    } else {
      const productExists = await this.prisma.euProduct.findUnique({
        where: { euProductId: productId },
      });
  
      if (!productExists) {
        throw new Error('EuProduct not found');
      }
  
      return this.prisma.userBasket.create({
        data: {
          clientId,
          euProductId: productId,
          ruProductId: null,  // Ensure this field is null for 'eu' products
        },
      });
    }
}

  
  
  

  async removeItem(clientId: number, productId: number, productType: 'ru' | 'eu') {
    let userBasketItem;

    if (productType === 'ru') {
      userBasketItem = await this.prisma.userBasket.findFirst({
        where: {
          clientId: clientId,
          ruProductId: productId,
        },
      });
    } else {
      userBasketItem = await this.prisma.userBasket.findFirst({
        where: {
          clientId: clientId,
          euProductId: productId,
        },
      });
    }

    if (!userBasketItem) {
      throw new Error('Product not found in user basket');
    }

    return this.prisma.userBasket.delete({
      where: { userBasketId: userBasketItem.userBasketId },
    });
  }

  async getUserBasket(clientId: number) {
    return this.prisma.userBasket.findMany({
      where: { clientId: clientId, },
      include: {
        ruProduct: true,
        euProduct: true,
      },
    });
  }
}