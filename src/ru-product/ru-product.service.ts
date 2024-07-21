import { Injectable } from '@nestjs/common';
import { CreateRuProductDto } from './dto/create-ru-product.dto';
import { UpdateRuProductDto } from './dto/update-ru-product.dto';

@Injectable()
export class RuProductService {
  create(createRuProductDto: CreateRuProductDto) {
    return 'This action adds a new ruProduct';
  }

  findAll() {
    return `This action returns all ruProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ruProduct`;
  }

  update(id: number, updateRuProductDto: UpdateRuProductDto) {
    return `This action updates a #${id} ruProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} ruProduct`;
  }
}
