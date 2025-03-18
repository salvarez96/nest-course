import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/controllers/products.controller';
import { ProductsModule } from './products/products.module';
import { CategoriesController } from './categories/controllers/categories.controller';
import { OrdersController } from './orders/controllers/orders.controller';
import { UsersController } from './users/controllers/users.controller';
import { CustomersController } from './customers/controllers/customers.controller';
import { BrandsController } from './brands/controllers/brands.controller';

@Module({
  imports: [ProductsModule],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    OrdersController,
    UsersController,
    CustomersController,
    BrandsController,
  ],
  providers: [AppService],
})
export class AppModule {}
