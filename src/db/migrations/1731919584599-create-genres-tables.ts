import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGenresTables1731919584599 implements MigrationInterface {
  name = 'CreateGenresTables1731919584599';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "book_to_genre_entity" (
                "id" SERIAL NOT NULL,
                "bookId" integer,
                "genreId" integer,
                CONSTRAINT "PK_9609353adec4e9bd440fcff78cf" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "genre_entity" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "UQ_94d44334b268391c7b80403b760" UNIQUE ("name"),
                CONSTRAINT "PK_cae0cec334ef1e35fe187160f0d" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "book_to_genre_entity"
            ADD CONSTRAINT "FK_25babc38f0290d6941c29e06afd" FOREIGN KEY ("bookId") REFERENCES "book_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "book_to_genre_entity"
            ADD CONSTRAINT "FK_f742c03a9eaa026d2f3a5892f34" FOREIGN KEY ("genreId") REFERENCES "genre_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "book_to_genre_entity" DROP CONSTRAINT "FK_f742c03a9eaa026d2f3a5892f34"
        `);
    await queryRunner.query(`
            ALTER TABLE "book_to_genre_entity" DROP CONSTRAINT "FK_25babc38f0290d6941c29e06afd"
        `);
    await queryRunner.query(`
            DROP TABLE "genre_entity"
        `);
    await queryRunner.query(`
            DROP TABLE "book_to_genre_entity"
        `);
  }
}
