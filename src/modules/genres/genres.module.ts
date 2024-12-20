import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { GenreEntity } from '../books/entity/genre.entity';
import { GenreRepository } from './genres.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GenreEntity])],
  controllers: [GenresController],
  providers: [GenresService, GenreRepository],
})
export class GenresModule {}
