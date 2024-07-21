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
      where: {
        euProductId : id
      } 
    })

    if (!product) throw new NotFoundException('Product not found')
      return product
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
}