import { Controller, Get } from '@nestjs/common';

@Controller('api/orders')
export class OrdersController {
  @Get()
  getOrders() {
    return 'This returns all orders';
  }
}
