import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthorTable1731919199103 implements MigrationInterface {
  name = 'CreateAuthorTable1731919199103';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "author_entity" (
                "id" SERIAL NOT NULL,
                "text" character varying NOT NULL,
                CONSTRAINT "UQ_12f7bdee78d4a8c39c7761d4cdd" UNIQUE ("text"),
                CONSTRAINT "PK_b150f6a93966648bfee48fcab2b" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "book_entity"
            ADD "authorId" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "book_entity"
            ADD CONSTRAINT "FK_7b9a5307408b20b7dc7be017f21" FOREIGN KEY ("authorId") REFERENCES "author_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "book_entity" DROP CONSTRAINT "FK_7b9a5307408b20b7dc7be017f21"
        `);
    await queryRunner.query(`
            ALTER TABLE "book_entity" DROP COLUMN "authorId"
        `);
    await queryRunner.query(`
            DROP TABLE "author_entity"
        `);
  }
}
