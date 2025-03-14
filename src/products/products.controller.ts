import { Controller, Get, Param, Query } from '@nestjs/common';

// create everything with nest g co products ; nest g mo products ; nest g s products

type DoubleParamEndpoint = {
  id: string;
  stats: string;
};

interface ProductsFilters {
  name?: string;
  category?: string;
}

@Controller('api/products')
export class ProductsController {
  @Get()
  getAllProducts(@Query() productsFilters: ProductsFilters): string {
    const { name, category } = productsFilters;
    return (
      'This gets all products' +
      (name ? ' with name: ' + name : '') +
      (category ? ' with category: ' + category : '')
    );
  }

  @Get('products/:id')
  getProduct(@Param('id') id: string): string {
    return 'This gets a product with id: ' + id;
  }

  @Get('products/:id/stats/:stats')
  getNewEndpointWithIdAndName(
    @Param() { id, stats }: DoubleParamEndpoint,
  ): string {
    return 'This gets the product with id: ' + id + ' and stats: ' + stats;
  }
}
