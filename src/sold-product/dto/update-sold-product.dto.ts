import { PartialType } from '@nestjs/mapped-types';
import { CreateSoldProductDto } from './create-sold-product.dto';

export class UpdateSoldProductDto extends PartialType(CreateSoldProductDto) {}
