export class ProductEntity {
  id: number;
  category: string;
  name: string;
  brand: string;
  price: number;
}

export interface DoubleParamEndpoint {
  id: string;
  stats: string;
}

export interface ProductsFilters {
  name?: string;
  category?: string;
}

export interface ApiResponse {
  code: number;
  message: string;
  data?: ProductEntity[] | ProductEntity;
}
