import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

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

type ApiResponse = {
  code: number;
  message: string;
  data?: CreateProductDTO | { id?: number };
};

@Controller('api/products')
export class ProductsController {
  @Get()
  getAll(@Query() productsFilters: ProductsFilters): ApiResponse {
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
  get(@Param('id') id: string): ApiResponse {
    return {
      code: 200,
      message: 'This gets a product with id: ' + id,
    };
  }

  @Get(':id/stats/:stats')
  getNewEndpointWithIdAndName(
    @Param() { id, stats }: DoubleParamEndpoint
  ): ApiResponse {
    return {
      code: 200,
      message: 'This gets the product with id: ' + id + ' and stats: ' + stats,
    };
  }

  @Post()
  create(@Body() body: CreateProductDTO): ApiResponse {
    return {
      code: 201,
      message: 'Product successfully created',
      data: body,
    };
  }

  @Put(':id')
  update(
    @Res() res: Response,
    @Param('id') id: number,
    @Body() body: CreateProductDTO
  ) {
    if (id != 100) {
      return res.status(HttpStatus.OK).json({
        code: 200,
        message: 'Product edited successfully',
        data: {
          id: id,
          ...body,
        },
      });
    }

    return res.status(HttpStatus.NOT_ACCEPTABLE).json({
      code: HttpStatus.NOT_ACCEPTABLE,
      message: 'Id: 100 causes an error',
    });
  }

  @Delete(':id')
  delete(@Param('id') id: number): ApiResponse {
    return {
      code: 200,
      message: 'Product deleted successfully',
      data: {
        id: id,
      },
    };
  }
}
