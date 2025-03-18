// import { ProductEntity } from './products.types';

// type ReadonlyProductEntity = Readonly<ProductEntity>;
// type OmitFromProductEntity<T extends keyof ReadonlyProductEntity> = Omit<
//   ReadonlyProductEntity,
//   T
// >;

export class CreateProductDTO {
  readonly category: string;
  readonly name: string;
  readonly brand: string;
  readonly price: number;
}

export class UpdateProductDTO {
  readonly category?: string;
  readonly name?: string;
  readonly brand?: string;
  readonly price?: number;
}
