import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from '../service/products.service';
import {
  ApiResponse,
  DoubleParamEndpoint,
  ProductsFilters,
} from '../types/products.types';
import { CreateProductPipe } from 'src/common/pipes/create-product.pipe';
import { CreateProductDTO } from '../types/products.dto';

// create everything with nest g co products ; nest g mo products ; nest g s products

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
  getOne(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const product = this.productsService.findOne(id);

      return this.parseResponse(res, HttpStatus.OK, 'Product found', product);
    } catch (error) {
      const exception = error as HttpException;

      return this.parseResponse(res, exception.getStatus(), exception.message);
    }
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
  create(
    @Res() res: Response,
    @Body(CreateProductPipe) body: CreateProductDTO
  ) {
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
    @Body(CreateProductPipe) body: CreateProductDTO
  ) {
    try {
      const productToEdit = this.productsService.update(+id, body);

      return this.parseResponse(
        res,
        HttpStatus.OK,
        'Product edited successfully',
        productToEdit
      );
    } catch (error) {
      const exception = error as HttpException;
      return this.parseResponse(res, exception.getStatus(), exception.message);
    }
  }

  @Delete(':id')
  delete(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const productToDelete = this.productsService.delete(id);

      return this.parseResponse(
        res,
        HttpStatus.OK,
        'Product deleted successfully',
        productToDelete
      );
    } catch (error) {
      const exception = error as HttpException;

      return this.parseResponse(res, exception.getStatus(), exception.message);
    }
  }

  private parseResponse(
    res: Response,
    code: number,
    message: string,
    data?: ApiResponse['data']
  ): Response<ApiResponse> {
    const jsonResponse = {
      code: code,
      message: message,
      data: data,
    };

    if (!data) delete jsonResponse.data;

    return res.status(code).json(jsonResponse) as Response<ApiResponse>;
  }
}
