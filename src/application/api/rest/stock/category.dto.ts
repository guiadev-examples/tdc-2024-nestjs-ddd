
import { Category } from '@domain/stock/category.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryEntryDto {
  @ApiProperty({
    description: 'Name',
    type: 'string',
  })
  name: string;

  toEntity(): Category {
    return new Category(this);
  }
}

export class CategoryDto extends CategoryEntryDto {
  constructor(partial: Partial<CategoryDto>) {
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

  static fromEntity(category: Category): CategoryDto {
    return new CategoryDto({
      publicId: category.publicId,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    });
  }
}
