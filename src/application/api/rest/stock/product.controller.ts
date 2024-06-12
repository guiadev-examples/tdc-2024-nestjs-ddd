import { CustomerService } from '@domain/accounts/customer.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ProductDto, ProductEntryDto } from './product.dto';
import { ProductService } from '@domain/stock/product.service';

@Controller()
@ApiBearerAuth('ApiKey')
@ApiTags('products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  @ApiResponse({ type: ProductDto, isArray: true })
  async getAll(): Promise<ProductDto[]> {
    const products = await this.service.findAll();
    return products.map((product) => ProductDto.fromEntity(product));
  }

  @Post()
  @ApiBody({
    type: ProductEntryDto,
  })
  @ApiResponse({ type: ProductDto })
  async create(@Body() productDto: ProductDto): Promise<ProductDto> {
    const product = await this.service.create(productDto.toEntity());
    return ProductDto.fromEntity(product);
  }

  @Get(':publicId')
  @ApiParam({
    name: 'publicId',
    type: 'string',
    description: 'Customer public ID',
  })
  @ApiResponse({ type: ProductDto })
  async getByPublicId(@Param('publicId') publicId: string): Promise<ProductDto> {
    const product = await this.service.findByPublicId(publicId);
    return ProductDto.fromEntity(product);
  }

  @Patch(':publicId')
  @ApiBody({
    type: ProductEntryDto,
  })
  @ApiResponse({ type: ProductDto })
  async update(
    @Param('publicId') publicId: string,
    @Body() productDto: ProductDto,
  ): Promise<ProductDto> {
    const product = await this.service.update(publicId, productDto.toEntity());
    return ProductDto.fromEntity(product);
  }

  @Delete(':publicId')
  async remove(@Param('publicId') publicId: string) {
    return this.service.remove(publicId);
  }
}
