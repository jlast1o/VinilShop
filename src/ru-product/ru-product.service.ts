import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRuProductDto } from './dto/create-ru-product.dto';
import { UpdateRuProductDto } from './dto/update-ru-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RuProductService {
  constructor(private prisma: PrismaService){}

  
  async findAll(searchTerm?:string) {
    const product = await this.prisma.ruProduct.findMany(searchTerm ?{
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
    const product = await this.prisma.ruProduct.findUnique({
      where: { ruProductId: id },
    });

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.ruProduct.findFirst({
      where: {
        slug : slug
      } 
    })
    if (!product) throw new NotFoundException('Product not found')
      return product
  }

  findRelatives(currentProductId : number){
    return this.prisma.ruProduct.findMany({
      where : {
        ruProductId : {
          not: currentProductId
        }
      }
    })  
  }

  async create(createRuProductDto: CreateRuProductDto) {
    return this.prisma.ruProduct.create({
      data: {
        linkToSource: createRuProductDto.linkToSource,
        name: createRuProductDto.name,
        productType: createRuProductDto.productType,
        size: createRuProductDto.size,
        color: createRuProductDto.color,
        description: createRuProductDto.description,
        slug: createRuProductDto.slug,
        weight: createRuProductDto.weight,
        buyingPrice: createRuProductDto.buyingPrice,
        postToNl: createRuProductDto.postToNl,
        postToRb: createRuProductDto.postToRb,
        postToBuyer: createRuProductDto.postToBuyer,
        wrapping: createRuProductDto.wrapping,
        extraFirst: createRuProductDto.extraFirst,
        wrappingSecond: createRuProductDto.wrappingSecond,
        selfprice: createRuProductDto.selfprice,
        selfpriceInRubles: createRuProductDto.selfpriceInRubles,
        sellingPriceInRubles: createRuProductDto.sellingPriceInRubles,
        profit: createRuProductDto.profit,
        // Убедитесь, что здесь нет поля euProductId
      } // Приведение к типу any, чтобы обойти проблему с типами
    });
  }

  async update(id: number, updateRuProductDto: UpdateRuProductDto) {
    const product = await this.prisma.ruProduct.update({
      where: { ruProductId: id },
      data: updateRuProductDto,
    });

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async remove(id: number) {
    const product = await this.prisma.ruProduct.delete({
      where: { ruProductId: id },
    });

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}
