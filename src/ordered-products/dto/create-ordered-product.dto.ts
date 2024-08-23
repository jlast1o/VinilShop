import { IsInt, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateOrderedProductDto {
  @IsInt()
  orderId: number;

  @IsInt()
  status: number;

  @IsOptional()
  @IsInt()
  ruProductId?: number;

  @IsOptional()
  @IsInt()
  euProductId?: number;

  @IsInt()
  trackNumber: number;
}