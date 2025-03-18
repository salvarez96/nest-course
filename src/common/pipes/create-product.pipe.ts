import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateProductDTO } from 'src/products/types/products.dto';

@Injectable()
export class CreateProductPipe implements PipeTransform {
  transform(value: CreateProductDTO, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') {
      throw new BadRequestException(
        `Expected body type, got ${metadata.type} instead`
      );
    }

    return value;
  }
}
