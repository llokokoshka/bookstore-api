import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBookTable1731919002027 implements MigrationInterface {
  name = 'CreateBookTable1731919002027';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "book_entity" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "img" character varying NOT NULL,
                "description" character varying NOT NULL,
                "isBestseller" boolean NOT NULL DEFAULT false,
                "isNew" boolean NOT NULL DEFAULT false,
                "dateOfIssue" date NOT NULL DEFAULT '1800-01-01',
                CONSTRAINT "PK_3ea5638ccafa8799838e68fad46" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "book_entity"
        `);
  }
}
