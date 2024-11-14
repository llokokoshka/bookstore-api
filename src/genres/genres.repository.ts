import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenreEntity } from 'src/books/entity/genre.entity';
import { Repository } from 'typeorm';

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
