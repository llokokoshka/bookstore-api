import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GenreEntity } from 'src/modules/books/entity/genre.entity';

@Injectable()
export class GenreRepository {
  constructor(
    @InjectRepository(GenreEntity)
    private genreRepository: Repository<GenreEntity>,
  ) {}

  async findAll(): Promise<GenreEntity[]> {
    return this.genreRepository.find();
  }
}
