import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCartTables1732175835379 implements MigrationInterface {
  name = 'CreateCartTables1732175835379';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "cart_entity" (
                "id" SERIAL NOT NULL,
                "total_price" integer NOT NULL DEFAULT '0',
                "userId" integer,
                CONSTRAINT "REL_8edda4b36869b45de9624747e8" UNIQUE ("userId"),
                CONSTRAINT "PK_7ec8a182dc29da3b1df23408149" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "cart_item_entity" (
                "id" SERIAL NOT NULL,
                "total_price" integer NOT NULL DEFAULT '0',
                "quantity" integer NOT NULL DEFAULT '1',
                "bookId" integer,
                "cartId" integer,
                CONSTRAINT "PK_78ae62a20293127e6032c631762" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "cart_entity"
            ADD CONSTRAINT "FK_8edda4b36869b45de9624747e8a" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "cart_item_entity"
            ADD CONSTRAINT "FK_66356b82a8d458598b20f28f3d4" FOREIGN KEY ("bookId") REFERENCES "book_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "cart_item_entity"
            ADD CONSTRAINT "FK_eabcbd5dff337a605c509c85abf" FOREIGN KEY ("cartId") REFERENCES "cart_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "cart_item_entity" DROP CONSTRAINT "FK_eabcbd5dff337a605c509c85abf"
        `);
    await queryRunner.query(`
            ALTER TABLE "cart_item_entity" DROP CONSTRAINT "FK_66356b82a8d458598b20f28f3d4"
        `);
    await queryRunner.query(`
            ALTER TABLE "cart_entity" DROP CONSTRAINT "FK_8edda4b36869b45de9624747e8a"
        `);
    await queryRunner.query(`
            DROP TABLE "cart_item_entity"
        `);
    await queryRunner.query(`
            DROP TABLE "cart_entity"
        `);
  }
}
