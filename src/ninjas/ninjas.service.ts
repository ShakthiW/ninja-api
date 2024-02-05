import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 0, name: 'NinjaA', weapon: 'stars' },
    { id: 1, name: 'NinjaB', weapon: 'numchucks' },
  ];

  getNinjas(weapon?: 'stars' | 'numchucks') {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }

    return this.ninjas;
  }

  getNinja(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id == id);

    if (!ninja) {
      throw new Error('Ninja not found');
    }

    return ninja;
  }

  createNinja(CreateNinjaDto: CreateNinjaDto) {
    // generate ninja id
    const newNinja = {
      ...CreateNinjaDto,
      id: Date.now(),
    };

    this.ninjas.push(newNinja);

    return newNinja;
  }

  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id == id) {
        return {
          ...ninja,
          ...updateNinjaDto,
        };
      }
      return ninja;
    });

    return this.getNinja(id);
  }

  removeNinja(id: number) {
    const toBeRemoved = this.getNinja(id);

    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);

    return toBeRemoved;
  }
}
