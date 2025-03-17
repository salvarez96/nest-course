import { Controller, Get } from '@nestjs/common';

@Controller('api/brands')
export class BrandsController {
  @Get()
  getBrands() {
    return 'This returns all brands';
  }
}
