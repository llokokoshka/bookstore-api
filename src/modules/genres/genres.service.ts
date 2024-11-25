import { Injectable, Logger } from '@nestjs/common';
import { GenreEntity } from 'src/modules/books/entity/genre.entity';
import { GenreRepository } from './genres.repository';

@Injectable()
export class GenresService {
  private readonly logger = new Logger(GenresService.name);
  constructor(private genreRepository: GenreRepository) {}

  async findAll(): Promise<GenreEntity[]> {
    try {
      return this.genreRepository.findAll();
    } catch (err) {
      this.logger.error(err);
    }
  }
}