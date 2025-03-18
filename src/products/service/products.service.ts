import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDTO } from '../types/products.types';

@Injectable()
export class ProductsService {
  private idCounter = 1;
  private products: ProductDTO[] = [
    {
      id: this.idCounter,
      name: 'Product 1',
      category: 'Category 1',
      brand: 'Brand 1',
      price: 20,
    },
    {
      id: ++this.idCounter,
      name: 'Product 2',
      category: 'Category 2',
      brand: 'Brand 2',
      price: 30,
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

  create(product: ProductDTO) {
    if (product.id && this.findOne(product.id)) return false;

    if (product.id) delete product.id;

    const newProduct = {
      id: ++this.idCounter,
      ...product,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, product: ProductDTO) {
    const productIndex = this.products.findIndex(
      (productToEdit) => productToEdit.id === id
    );

    if (productIndex < 0)
      throw new NotFoundException(`Product with id ${id} not found`);

    if (product.id) delete product.id;

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
