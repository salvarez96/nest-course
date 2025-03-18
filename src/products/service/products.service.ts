import { Injectable } from '@nestjs/common';

type ProductDTO = {
  id?: number;
  name: string;
  brand: string;
  price: number;
};

@Injectable()
export class ProductsService {
  private idCounter = 1;
  private products: ProductDTO[] = [
    {
      id: this.idCounter,
      name: 'Product 1',
      brand: 'Brand 1',
      price: 20,
    },
    {
      id: ++this.idCounter,
      name: 'Product 2',
      brand: 'Brand 2',
      price: 30,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((product) => product.id === id);
  }

  create(product: ProductDTO) {
    if (
      product.id &&
      this.products.some((existingProduct) => existingProduct.id === product.id)
    ) {
      return `The product with id: ${product.id} already exists.`;
    }

    if (product.id) delete product.id;

    const newProduct = {
      id: ++this.idCounter,
      ...product,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  update(product: ProductDTO) {
    const productIndex = this.products.findIndex(
      (productToEdit) => productToEdit.id === product.id
    );

    if (productIndex < 0) {
      return `The product with id: ${product.id} doesn't exist`;
    }

    delete product.id;

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...product,
    };

    return this.products[productIndex];
  }

  delete(id: number) {
    const productIndex = this.products.findIndex(
      (productToDelete) => productToDelete.id === id
    );

    if (productIndex < 0) {
      return `The product with id: ${id} doesn't exist`;
    }

    const product = this.findOne(id);

    this.products.splice(productIndex, 1);

    return product;
  }
}
