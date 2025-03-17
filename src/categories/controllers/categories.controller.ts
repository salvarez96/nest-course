import { Controller, Get, Param } from '@nestjs/common';

@Controller('api/categories')
export class CategoriesController {
  @Get()
  getCategories() {
    return 'This returns all categories';
  }
  @Get(':id')
  getCategory(@Param('id') id: number) {
    return `This returns category with id: ${id}`;
  }
}
