import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from '../types/products.types';
import { CreateProductDTO, UpdateProductDTO } from '../types/products.dto';

@Injectable()
export class ProductsService {
  private idCounter = 1;
  private products: ProductEntity[] = [
    {
      id: this.idCounter,
      name: 'Product 1',
      category: 'Category 1',
      brand: 'Brand 1',
      price: 20,
      stock: 10,
    },
    {
      id: ++this.idCounter,
      name: 'Product 2',
      category: 'Category 2',
      brand: 'Brand 2',
      price: 30,
      stock: 15,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  create(product: CreateProductDTO) {
    // if (product.id && this.findOne(product.id)) return false;

    const newProduct = {
      ...product,
      id: ++this.idCounter,
    };

    this.products.push(newProduct as ProductEntity);

    return newProduct;
  }

  update(id: number, product: UpdateProductDTO) {
    const productIndex = this.products.findIndex(
      (productToEdit) => productToEdit.id === id
    );

    if (productIndex < 0)
      throw new NotFoundException(`Product with id ${id} not found`);

    // if (product.id) delete product.id;

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...product,
    };

    return this.products[productIndex];
  }

  delete(id: number) {
    const product = this.findOne(id);

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    const productIndex = this.products.findIndex(
      (productToDelete) => productToDelete.id === id
    );

    this.products.splice(productIndex, 1);

    return product;
  }
}
