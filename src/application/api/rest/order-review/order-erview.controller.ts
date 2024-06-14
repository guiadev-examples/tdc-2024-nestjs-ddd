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
import { OrderReviewDto, OrderReviewEntryDto } from './order-review.dto';


@Controller()
@ApiBearerAuth('ApiKey')
@ApiTags('order-reviews')
@UseInterceptors(ClassSerializerInterceptor)
export class OrderReviewController {
  constructor() {}

  @Get()
  @ApiResponse({ type: OrderReviewDto, isArray: true })
  async getAll(): Promise<OrderReviewDto[]> {
    return [];
  }

  @Post()
  @ApiBody({
    type: OrderReviewEntryDto,
  })
  @ApiResponse({ type: OrderReviewDto })
  async create(@Body() orderReviewEntryDto: OrderReviewEntryDto): Promise<OrderReviewDto> {
    return null;
  }
}
