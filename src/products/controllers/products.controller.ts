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
import { ProductDTO, ProductsService } from '../service/products.service';

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
  data?: CreateProductDTO | { id?: number } | ProductDTO[];
};

@Controller('api/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAll(@Res() res: Response, @Query() productsFilters: ProductsFilters) {
    const { name, category } = productsFilters;
    return res.status(HttpStatus.OK).json({
      code: 200,
      message:
        'This gets all products' +
        (name ? ' with name: ' + name : '') +
        (category ? ' with category: ' + category : ''),
      data: this.productsService.findAll(),
    });
  }

  @Get(':id')
  getOne(@Res() res: Response, @Param('id') id: string) {
    const product = this.productsService.findOne(+id);

    if (!product) {
      return res.status(HttpStatus.NOT_FOUND).json({
        code: 404,
        message: "The product doesn't exist",
      });
    }

    return {
      code: 200,
      message: 'Product found',
      data: product,
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
  create(@Res() res: Response, @Body() body: CreateProductDTO) {
    const newProduct = this.productsService.create(body);

    if (newProduct) {
      return res.status(HttpStatus.CREATED).json({
        code: 201,
        message: 'Product successfully created',
        data: newProduct,
      });
    }

    return res.status(HttpStatus.BAD_REQUEST).json({
      code: 400,
      message: "The product doesn't exist",
    });
  }

  @Put(':id')
  update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: CreateProductDTO
  ) {
    const productToEdit = this.productsService.update(+id, body);

    if (productToEdit) {
      return res.status(HttpStatus.OK).json({
        code: 200,
        message: 'Product edited successfully',
        data: productToEdit,
      });
    }

    return res.status(HttpStatus.NOT_FOUND).json({
      code: HttpStatus.NOT_FOUND,
      message: "The product doesn't exist",
    });
  }

  @Delete(':id')
  delete(@Res() res: Response, @Param('id') id: string) {
    const productToDelete = this.productsService.delete(+id);

    if (productToDelete) {
      return res.status(HttpStatus.OK).json({
        code: 200,
        message: 'Product deleted successfully',
        data: productToDelete,
      });
    }

    return res.status(HttpStatus.NOT_FOUND).json({
      code: HttpStatus.NOT_FOUND,
      message: 'Product not found',
    });
  }
}
