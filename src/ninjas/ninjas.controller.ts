import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
// @UseGuards(BeltGuard) // we can apply gurds to entire controller... this protects all the ninja routes
export class NinjasController {
  constructor(private readonly ninjaService: NinjasService) {}

  // GET /ninjas --> []
  @Get()
  getNinjas(@Query('weapon') weapon: 'stars' | 'numchucks') {
    //const service = new NinjasService();
    return this.ninjaService.getNinjas(weapon);
  }

  // GET /ninjas/:id --> { ... }
  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    // ParseIntPipe converts string to number
    try {
      // return this.ninjaService.getNinja(+id);  +id converts string to number
      return this.ninjaService.getNinja(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  // POST /ninjas
  @Post()
  @UseGuards(BeltGuard) // we can apply gurds to individual routes
  createNinja(@Body(new ValidationPipe()) CreateNinjaDto: CreateNinjaDto) {
    return this.ninjaService.createNinja(CreateNinjaDto);
  }

  // PUT /ninjas/:id --> { ... }
  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() UpdateNinjaDto: UpdateNinjaDto) {
    return this.ninjaService.updateNinja(+id, UpdateNinjaDto);
  }

  // DELETE /ninjas/:id
  @Delete(':id')
  removeNinja(@Param('id') id: string) {
    return this.ninjaService.removeNinja(+id);
  }
}
