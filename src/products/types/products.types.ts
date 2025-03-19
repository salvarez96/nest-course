export class ProductEntity {
  id: number;
  category: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
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
  statusCode: number;
  message: string;
  data?: ProductEntity[] | ProductEntity | string[];
}
