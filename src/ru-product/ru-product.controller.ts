import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RuProductService } from './ru-product.service';
import { CreateRuProductDto } from './dto/create-ru-product.dto';
import { UpdateRuProductDto } from './dto/update-ru-product.dto';

@Controller('ru-product')
export class RuProductController {
  constructor(private readonly ruProductService: RuProductService) {}

  @Get()
  findAll(@Query('searchTerm') searchTerm?: string) {
    return this.ruProductService.findAll(searchTerm);
  }

  @Get('/slug/:id')
  findBySlug(@Param('slug') slug: string) {
    return this.ruProductService.findBySlug(slug);
  }

  @Get('/relatives/:id')
  findRelatives(@Param('id') id: string) {
    return this.ruProductService.findRelatives(+id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.ruProductService.findById(+id);
  }

  @Post('create')
  create(@Body() createEuProductDto: CreateRuProductDto) {
    return this.ruProductService.create(createEuProductDto);
  }

  @Patch('/edit/:id')
  update(@Param('id') id: string, @Body() updateEuProductDto: UpdateRuProductDto) {
    return this.ruProductService.update(+id, updateEuProductDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.ruProductService.remove(+id);
  }
}
