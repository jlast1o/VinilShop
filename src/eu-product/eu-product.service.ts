import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEuProductDto } from './dto/create-eu-product.dto';
import { UpdateEuProductDto } from './dto/update-eu-product.dto';
import { PrismaService } from 'src/prisma.service';
import { EuProduct, Prisma } from '@prisma/client';

@Injectable()
export class EuProductService {

  constructor(private prisma: PrismaService){}

  async findAll(searchTerm?:string) {
    const product = await this.prisma.euProduct.findMany(searchTerm ?{
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
            },
          },
          {
            description: {
              contains: searchTerm,
            },
          },
        ],
      },
    } : undefined);

    if (!product) throw new NotFoundException('Product not found')
      return product
  }

  async findById(id: number) {
    const product = await this.prisma.euProduct.findUnique({
      where: { euProductId: id },
    });

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.euProduct.findFirst({
      where: {
        slug : slug
      } 
    })
    if (!product) throw new NotFoundException('Product not found')
      return product
  }

  findRelatives(currentProductId : number){
    return this.prisma.euProduct.findMany({
      where : {
        euProductId : {
          not: currentProductId
        }
      }
    })  
  }

  async create(createEuProductDto: CreateEuProductDto) {
    return this.prisma.euProduct.create({
      data: {
        linkToSource: createEuProductDto.linkToSource,
        name: createEuProductDto.name,
        productType: createEuProductDto.productType,
        size: createEuProductDto.size,
        color: createEuProductDto.color,
        description: createEuProductDto.description,
        slug: createEuProductDto.slug,
        weight: createEuProductDto.weight,
        buyingPrice: createEuProductDto.buyingPrice,
        postToNl: createEuProductDto.postToNl,
        postToBuyer: createEuProductDto.postToBuyer,
        wrapping: createEuProductDto.wrapping,
        extraFirst: createEuProductDto.extraFirst,
        selfprice: createEuProductDto.selfprice,
        sellingPrice: createEuProductDto.sellingPrice,
        profit: createEuProductDto.profit,
        // Убедитесь, что здесь нет поля euProductId
      } // Приведение к типу any, чтобы обойти проблему с типами
    });
  }

  async update(id: number, updateEuProductDto: UpdateEuProductDto) {
    const product = await this.prisma.euProduct.update({
      where: { euProductId: id },
      data: updateEuProductDto,
    });

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async remove(id: number) {
    const product = await this.prisma.euProduct.delete({
      where: { euProductId: id },
    });

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}