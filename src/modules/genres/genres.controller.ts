import { Controller, Get } from '@nestjs/common';

import { GenresService } from './genres.service';
import { GenreEntity } from '../books/entity/genre.entity';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  async getGenres(): Promise<GenreEntity[]> {
    return this.genresService.findAll();
  }
}
