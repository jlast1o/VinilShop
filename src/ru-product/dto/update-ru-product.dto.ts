import { PartialType } from '@nestjs/mapped-types';
import { CreateRuProductDto } from './create-ru-product.dto';

export class UpdateRuProductDto extends PartialType(CreateRuProductDto) {}
