import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarrierService } from './carrier.service';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierDto } from './dto/update-carrier.dto';

@Controller('carrier')
export class CarrierController {
  constructor(private readonly carrierService: CarrierService) {}

  @Post()
  create(@Body() createCarrierDto: CreateCarrierDto) {
    return this.carrierService.create(createCarrierDto);
  }

  @Get()
  findAll() {
    return this.carrierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carrierService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarrierDto: UpdateCarrierDto) {
    return this.carrierService.update(+id, updateCarrierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carrierService.remove(+id);
  }
}
