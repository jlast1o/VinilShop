import { IsInt, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateOrderedProductDto {
    @IsOptional()
    @IsInt()
    status?: number;
  
    @IsOptional()
    @IsInt()
    ruProductId?: number;
  
    @IsOptional()
    @IsInt()
    euProductId?: number;
  
    @IsOptional()
    @IsInt()
    trackNumber?: number;
  }