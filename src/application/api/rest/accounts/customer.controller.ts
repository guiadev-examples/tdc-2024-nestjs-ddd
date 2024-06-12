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
import { CustomerDto, CustomerEntryDto } from './customer.dto';

@Controller()
@ApiBearerAuth('ApiKey')
@ApiTags('customers')
@UseInterceptors(ClassSerializerInterceptor)
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Get()
  @ApiResponse({ type: CustomerDto, isArray: true })
  async getAll(): Promise<CustomerDto[]> {
    const customers = await this.service.findAll();
    return customers.map((customer) => CustomerDto.fromEntity(customer));
  }

  @Post()
  @ApiBody({
    type: CustomerEntryDto,
  })
  @ApiResponse({ type: CustomerDto })
  async create(@Body() customerDto: CustomerDto): Promise<CustomerDto> {
    const customer = await this.service.create(customerDto.toEntity());
    return CustomerDto.fromEntity(customer);
  }

  @Get(':publicId')
  @ApiParam({
    name: 'publicId',
    type: 'string',
    description: 'Customer public ID',
  })
  @ApiResponse({ type: CustomerDto })
  async getByPublicId(@Param('publicId') publicId: string): Promise<CustomerDto> {
    const customer = await this.service.findByPublicId(publicId);
    return CustomerDto.fromEntity(customer);
  }

  @Patch(':publicId')
  @ApiBody({
    type: CustomerEntryDto,
  })
  @ApiResponse({ type: CustomerDto })
  async update(
    @Param('publicId') publicId: string,
    @Body() customerDto: CustomerDto,
  ): Promise<CustomerDto> {
    const customer = await this.service.update(publicId, customerDto.name);
    return CustomerDto.fromEntity(customer);
  }

  @Delete(':publicId')
  async remove(@Param('publicId') publicId: string) {
    return this.service.remove(publicId);
  }
}
