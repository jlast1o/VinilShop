import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RuProductService } from './ru-product.service';
import { CreateRuProductDto } from './dto/create-ru-product.dto';
import { UpdateRuProductDto } from './dto/update-ru-product.dto';

@Controller('ru-product')
export class RuProductController {
  constructor(private readonly ruProductService: RuProductService) {}

  @Post()
  create(@Body() createRuProductDto: CreateRuProductDto) {
    return this.ruProductService.create(createRuProductDto);
  }

  @Get()
  findAll() {
    return this.ruProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ruProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRuProductDto: UpdateRuProductDto) {
    return this.ruProductService.update(+id, updateRuProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ruProductService.remove(+id);
  }
}
