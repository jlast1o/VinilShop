import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EuProductService } from './eu-product.service';
import { CreateEuProductDto } from './dto/create-eu-product.dto';
import { UpdateEuProductDto } from './dto/update-eu-product.dto';

@Controller('eu-product')
export class EuProductController {
  constructor(private readonly euProductService: EuProductService) {}

 //@Post()
  //create(@Body() createEuProductDto: CreateEuProductDto) {
//    return this.euProductService.create(createEuProductDto);
 // }

  @Get()
  findAll(@Query('searchTerm') searchTerm?: string) {
    return this.euProductService.findAll(searchTerm);
  }

  @Get('/slug/:id')
  findBySlug(@Param('slug') slug: string) {
    return this.euProductService.findBySlug(slug);
  }

  @Get('/relatives/:id')
  findRelatives(@Param('id') id: string) {
    return this.euProductService.findRelatives(+id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.euProductService.findById(+id);
  }

  @Post('create')
  create(@Body() createEuProductDto: CreateEuProductDto) {
    return this.euProductService.create(createEuProductDto);
  }

  @Patch('/edit/:id')
  update(@Param('id') id: string, @Body() updateEuProductDto: UpdateEuProductDto) {
    return this.euProductService.update(+id, updateEuProductDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.euProductService.remove(+id);
  }

}
