// create-eu-product.dto.ts
export class CreateEuProductDto {
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
  postToBuyer: number;
  wrapping: number;
  extraFirst: number; // Обновлено
  selfprice: number;
  sellingPrice: number;
  profit: number;
  // euProductId не включаем, если он генерируется автоматически
}
