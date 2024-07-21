import { PartialType } from '@nestjs/mapped-types';
import { CreateEuProductDto } from './create-eu-product.dto';

export class UpdateEuProductDto extends PartialType(CreateEuProductDto) {}
