import { PartialType } from '@nestjs/mapped-types';
import { CreateUserBasketDto } from './create-user-basket.dto';

export class UpdateUserBasketDto extends PartialType(CreateUserBasketDto) {}
