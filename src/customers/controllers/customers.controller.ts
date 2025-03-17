import { Controller, Get } from '@nestjs/common';

@Controller('api/customers')
export class CustomersController {
  @Get()
  getCustomers() {
    return 'This returns all customers';
  }
}
