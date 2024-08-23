import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateOrderedProductDto } from './dto/update-ordered-product.dto';


@Injectable()
export class OrderedProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async processOrderedProducts(clientId: number, orderId: number) {
    try {
      // 1. Получение продуктов из корзины пользователя
      const userBasketItems = await this.prisma.userBasket.findMany({
        where: { clientId },
        include: { ruProduct: true, euProduct: true },
      });
  
      if (userBasketItems.length === 0) {
        console.log('Корзина пользователя пуста');
        return;
      }
  
      // 2. Проверка существования продуктов
      const existingRuProductIds = userBasketItems
        .map(item => item.ruProductId)
        .filter((id): id is number => id !== undefined && id !== null); // Проверка на undefined и null
  
      const existingEuProductIds = userBasketItems
        .map(item => item.euProductId)
        .filter((id): id is number => id !== undefined && id !== null); // Проверка на undefined и null
  
      if (existingRuProductIds.length === 0 && existingEuProductIds.length === 0) {
        console.log('Нет ID продуктов для проверки');
        return;
      }
  
      // Запрос существующих продуктов
      const existingRuProducts = await this.prisma.ruProduct.findMany({
        where: { ruProductId: { in: existingRuProductIds } },
      });
  
      const existingEuProducts = await this.prisma.euProduct.findMany({
        where: { euProductId: { in: existingEuProductIds } },
      });
  
      // Создаем набор существующих ID продуктов для проверки
      const validRuProductIds = new Set(existingRuProducts.map(p => p.ruProductId));
      const validEuProductIds = new Set(existingEuProducts.map(p => p.euProductId));
  
      // 3. Создание записей в OrderedProduct
      const validUserBasketItems = userBasketItems.filter(item =>
        (item.ruProductId && validRuProductIds.has(item.ruProductId)) ||
        (item.euProductId && validEuProductIds.has(item.euProductId))
      );
  
      if (validUserBasketItems.length === 0) {
        console.log('Нет действительных продуктов в корзине');
        return;
      }
  
      await this.prisma.orderedProduct.createMany({
        data: validUserBasketItems.map(item => ({
          orderId,
          ruProductId: item.ruProductId ?? null,
          euProductId: item.euProductId ?? null,
          trackNumber: 0, // Можно заменить на реальный трек-номер, если он есть
          status: 0, // Статус по умолчанию, если требуется
        })),
      });
  
      // 4. Опционально: Удаление продуктов из корзины пользователя
      await this.prisma.userBasket.deleteMany({
        where: { clientId },
      });
  
      console.log('Продукты успешно добавлены в заказ и удалены из корзины');
    } catch (error) {
      // Обработка ошибок
      console.error('Ошибка при обработке заказанных продуктов:', error);
      throw new Error('Не удалось обработать заказанные продукты');
    }
  }

  async findOne(id: number) {
    return this.prisma.orderedProduct.findUnique({
      where: { orderedProductId: id },
    });
  }

  async findByOrderId(orderId: number) {
    return this.prisma.orderedProduct.findMany({
      where: { orderId },
    });
  }

  async findAll() {
    return this.prisma.orderedProduct.findMany();
  }

  async update(id: number, updateDto: UpdateOrderedProductDto) {
    const existingProduct = await this.prisma.orderedProduct.findUnique({
      where: { orderedProductId: id },
    });

    if (!existingProduct) {
      throw new NotFoundException('OrderedProduct not found');
    }

    return this.prisma.orderedProduct.update({
      where: { orderedProductId: id },
      data: updateDto,
    });
  }

  async delete(id: number) {
    const existingProduct = await this.prisma.orderedProduct.findUnique({
      where: { orderedProductId: id },
    });

    if (!existingProduct) {
      throw new NotFoundException('OrderedProduct not found');
    }

    return this.prisma.orderedProduct.delete({
      where: { orderedProductId: id },
    });
  }

  async deleteByOrderId(orderId: number) {
    return this.prisma.orderedProduct.deleteMany({
      where: { orderId },
    });
  }
  
  
}

