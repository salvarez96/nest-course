import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

// create everything with nest g co products ; nest g mo products ; nest g s products

type DoubleParamEndpoint = {
  id: string;
  stats: string;
};

interface ProductsFilters {
  name?: string;
  category?: string;
}

interface CreateProductDTO {
  name: string;
  category: string;
  brand: string;
  price: number;
}

type Response = {
  code: number;
  message: string;
  data?: CreateProductDTO;
};

@Controller('api/products')
export class ProductsController {
  @Get()
  getAll(@Query() productsFilters: ProductsFilters): Response {
    const { name, category } = productsFilters;
    return {
      code: 200,
      message:
        'This gets all products' +
        (name ? ' with name: ' + name : '') +
        (category ? ' with category: ' + category : ''),
    };
  }

  @Get(':id')
  get(@Param('id') id: string): Response {
    return {
      code: 200,
      message: 'This gets a product with id: ' + id,
    };
  }

  @Get(':id/stats/:stats')
  getNewEndpointWithIdAndName(
    @Param() { id, stats }: DoubleParamEndpoint
  ): Response {
    return {
      code: 200,
      message: 'This gets the product with id: ' + id + ' and stats: ' + stats,
    };
  }

  @Post()
  create(@Body() body: CreateProductDTO): Response {
    return {
      code: 201,
      message: 'Product successfully created',
      data: body,
    };
  }
}
