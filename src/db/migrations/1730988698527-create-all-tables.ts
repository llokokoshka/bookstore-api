import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAllTables1730988698527 implements MigrationInterface {
  name = 'CreateAllTables1730988698527';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "rate_entity" (
                "id" SERIAL NOT NULL,
                "userId" integer,
                "bookId" integer,
                CONSTRAINT "PK_b76e740d646ae1a712d283c0b99" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "author_entity" (
                "id" SERIAL NOT NULL,
                "text" character varying NOT NULL,
                CONSTRAINT "PK_b150f6a93966648bfee48fcab2b" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "genre_entity" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_cae0cec334ef1e35fe187160f0d" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "book_to_genre_entity" (
                "id" SERIAL NOT NULL,
                "bookId" integer,
                "genreId" integer,
                CONSTRAINT "PK_9609353adec4e9bd440fcff78cf" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "book_entity" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "img" character varying NOT NULL,
                "quantity" integer NOT NULL,
                "authorId" integer,
                CONSTRAINT "PK_3ea5638ccafa8799838e68fad46" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "comments_entity" (
                "id" SERIAL NOT NULL,
                "text" character varying NOT NULL,
                "userId" integer,
                "bookId" integer,
                CONSTRAINT "PK_27b6725d03ab49cab126157e999" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user_entity" (
                "id" SERIAL NOT NULL,
                "fullName" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "avatar" character varying NOT NULL,
                CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"),
                CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "rate_entity"
            ADD CONSTRAINT "FK_82d060085d6072e094534ef7ed3" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "rate_entity"
            ADD CONSTRAINT "FK_b80e55a38addd737972b9afd890" FOREIGN KEY ("bookId") REFERENCES "book_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "book_to_genre_entity"
            ADD CONSTRAINT "FK_25babc38f0290d6941c29e06afd" FOREIGN KEY ("bookId") REFERENCES "book_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "book_to_genre_entity"
            ADD CONSTRAINT "FK_f742c03a9eaa026d2f3a5892f34" FOREIGN KEY ("genreId") REFERENCES "genre_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "book_entity"
            ADD CONSTRAINT "FK_7b9a5307408b20b7dc7be017f21" FOREIGN KEY ("authorId") REFERENCES "author_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "comments_entity"
            ADD CONSTRAINT "FK_4d18b48a88029f2e6c4a6544f44" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "comments_entity"
            ADD CONSTRAINT "FK_156964ca8af3037a07f9c34fc53" FOREIGN KEY ("bookId") REFERENCES "book_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comments_entity" DROP CONSTRAINT "FK_156964ca8af3037a07f9c34fc53"
        `);
    await queryRunner.query(`
            ALTER TABLE "comments_entity" DROP CONSTRAINT "FK_4d18b48a88029f2e6c4a6544f44"
        `);
    await queryRunner.query(`
            ALTER TABLE "book_entity" DROP CONSTRAINT "FK_7b9a5307408b20b7dc7be017f21"
        `);
    await queryRunner.query(`
            ALTER TABLE "book_to_genre_entity" DROP CONSTRAINT "FK_f742c03a9eaa026d2f3a5892f34"
        `);
    await queryRunner.query(`
            ALTER TABLE "book_to_genre_entity" DROP CONSTRAINT "FK_25babc38f0290d6941c29e06afd"
        `);
    await queryRunner.query(`
            ALTER TABLE "rate_entity" DROP CONSTRAINT "FK_b80e55a38addd737972b9afd890"
        `);
    await queryRunner.query(`
            ALTER TABLE "rate_entity" DROP CONSTRAINT "FK_82d060085d6072e094534ef7ed3"
        `);
    await queryRunner.query(`
            DROP TABLE "user_entity"
        `);
    await queryRunner.query(`
            DROP TABLE "comments_entity"
        `);
    await queryRunner.query(`
            DROP TABLE "book_entity"
        `);
    await queryRunner.query(`
            DROP TABLE "book_to_genre_entity"
        `);
    await queryRunner.query(`
            DROP TABLE "genre_entity"
        `);
    await queryRunner.query(`
            DROP TABLE "author_entity"
        `);
    await queryRunner.query(`
            DROP TABLE "rate_entity"
        `);
  }
}
