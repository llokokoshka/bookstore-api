import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFavoriteTable1732282072905 implements MigrationInterface {
  name = 'CreateFavoriteTable1732282072905';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "favorites_entity" (
                "id" SERIAL NOT NULL,
                "userId" integer,
                CONSTRAINT "REL_66e261b7ccffe02ebc5791c696" UNIQUE ("userId"),
                CONSTRAINT "PK_e42953e6be13870839a04a3fa88" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "favorites_item_entity" (
                "id" SERIAL NOT NULL,
                "bookId" integer,
                "favoriteId" integer,
                CONSTRAINT "PK_9e56c5a14ab6c6ea5c67c1bf149" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "favorites_entity"
            ADD CONSTRAINT "FK_66e261b7ccffe02ebc5791c696f" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "favorites_item_entity"
            ADD CONSTRAINT "FK_0b252245279d0cc8301e5b57049" FOREIGN KEY ("bookId") REFERENCES "book_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "favorites_item_entity"
            ADD CONSTRAINT "FK_09f2deebab24cef25e714abc023" FOREIGN KEY ("favoriteId") REFERENCES "favorites_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "favorites_item_entity" DROP CONSTRAINT "FK_09f2deebab24cef25e714abc023"
        `);
    await queryRunner.query(`
            ALTER TABLE "favorites_item_entity" DROP CONSTRAINT "FK_0b252245279d0cc8301e5b57049"
        `);
    await queryRunner.query(`
            ALTER TABLE "favorites_entity" DROP CONSTRAINT "FK_66e261b7ccffe02ebc5791c696f"
        `);
    await queryRunner.query(`
            DROP TABLE "favorites_item_entity"
        `);
    await queryRunner.query(`
            DROP TABLE "favorites_entity"
        `);
  }
}
