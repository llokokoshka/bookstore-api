import { Injectable } from '@nestjs/common';
import { GenreEntity } from 'src/modules/books/entity/genre.entity';
import { GenreRepository } from './genres.repository';

@Injectable()
export class GenresService {
  constructor(private genreRepository: GenreRepository) {}

  async findAll(): Promise<GenreEntity[]> {
    return this.genreRepository.findAll();
  }
}
