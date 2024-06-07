import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SoldProductService } from './sold-product.service';
import { CreateSoldProductDto } from './dto/create-sold-product.dto';
import { UpdateSoldProductDto } from './dto/update-sold-product.dto';

@Controller('sold-product')
export class SoldProductController {
  constructor(private readonly soldProductService: SoldProductService) {}

  @Post()
  create(@Body() createSoldProductDto: CreateSoldProductDto) {
    return this.soldProductService.create(createSoldProductDto);
  }

  @Get()
  findAll() {
    return this.soldProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.soldProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSoldProductDto: UpdateSoldProductDto) {
    return this.soldProductService.update(+id, updateSoldProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.soldProductService.remove(+id);
  }
}
