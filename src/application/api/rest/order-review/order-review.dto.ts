import { ApiProperty } from '@nestjs/swagger';

export class OrderReviewEntryDto {
  @ApiProperty({
    description: 'Order public id',
    type: 'string',
  })
  orderPublicId: string;

  @ApiProperty({
    description: 'Review Score',
    type: 'number',
  })
  score: number;

  @ApiProperty({
    description: 'Order Comment',
    type: 'string',
  })
  comment: string;

}

export class OrderReviewDto extends OrderReviewEntryDto {
  constructor(partial: Partial<OrderReviewDto>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({
    description: 'Data de criação do processador',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da ultima atualização do processador',
    type: Date,
  })
  updatedAt: Date;
}
