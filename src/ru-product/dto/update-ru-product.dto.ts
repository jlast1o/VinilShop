import { PartialType } from '@nestjs/mapped-types';
import { CreateRuProductDto } from './create-ru-product.dto';

export class UpdateRuProductDto extends PartialType(CreateRuProductDto) {
    linkToSource: string;
    name: string;
    productType: string;
    size: string;
    color: string;
    description: string;
    slug: string;
    weight: number;
    buyingPrice: number;
    postToNl: number;
    postToRb: number;
    postToBuyer: number;
    wrapping: number;
    extraFirst: number; 
    wrappingSecond: number;
    selfprice: number;
    selfpriceInRubles: number;
    sellingPriceInRubles: number;
    profit: number;
}
