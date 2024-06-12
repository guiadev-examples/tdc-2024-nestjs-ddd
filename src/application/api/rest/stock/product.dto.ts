import { ApiProperty } from '@nestjs/swagger';
import { CategoryDto } from './category.dto';
import { ManufacturerDto } from './manufacturer.dto';
import { SupplierDto } from './supplier.dto';
import { Product } from '@domain/stock/product.entity';

export class ProductEntryDto {
  @ApiProperty({
    description: 'Product name',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    description: 'Description',
    type: 'string',
  })
  description: string;

  @ApiProperty({
    description: 'Stock Quantity',
    type: 'number',
  })
  stockQuantity: number;

  @ApiProperty({
    description: 'Category',
    type: CategoryDto,
  })
  category: CategoryDto;

  @ApiProperty({
    description: 'Manufacturer',
    type: ManufacturerDto,
  })
  manufacturer: ManufacturerDto;


  @ApiProperty({
    description: 'Supplier',
    type: SupplierDto,
  })
  supplier: SupplierDto;

  toEntity(): Product {
    return new Product({
      name: this.name,
      description: this.description,
      stockQuantity: this.stockQuantity,
      category: this.category.toEntity(),
      manufacturer: this.manufacturer.toEntity(),
      supplier: this.supplier.toEntity(),      
    });
  }
}

export class ProductDto extends ProductEntryDto {
  constructor(partial: Partial<ProductDto>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: 'Public Id',
    type: 'string',
  })
  publicId: string;

  @ApiProperty({
    description: 'Creation Date',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date',
    type: Date,
  })
  updatedAt: Date;

  static fromEntity(customer: Product): ProductDto {
    return new ProductDto({
      publicId: customer.publicId,
      name: customer.name,
      description: customer.description,
      stockQuantity: customer.stockQuantity,
      category: CategoryDto.fromEntity(customer.category),
      manufacturer: ManufacturerDto.fromEntity(customer.manufacturer),
      supplier: SupplierDto.fromEntity(customer.supplier),
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    });
  }
}
