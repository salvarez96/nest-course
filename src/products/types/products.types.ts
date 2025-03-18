export type ProductDTO = {
  id?: number;
  category: string;
  name: string;
  brand: string;
  price: number;
};

export type CreateProductDTO = Omit<ProductDTO, 'id'>;

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
  data?: ProductDTO[] | ProductDTO;
}
