import { IsEnum, MinLength } from 'class-validator';

export class CreateNinjaDto {
  @MinLength(3)
  name: string;

  @IsEnum(['stars', 'numchucks'], {
    message: 'weapon must be either stars or numchucks',
  })
  weapon: 'stars' | 'numchucks';
}
