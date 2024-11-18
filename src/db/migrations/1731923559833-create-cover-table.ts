import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCoversTable1731923559833 implements MigrationInterface {
  name = 'CreateCoversTable1731923559833';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "cover_entity" (
                "id" SERIAL NOT NULL,
                "paperback_price" integer NOT NULL DEFAULT '0',
                "paperback_amount" integer NOT NULL DEFAULT '0',
                "hardcover_price" integer NOT NULL DEFAULT '0',
                "hardcover_amount" integer NOT NULL DEFAULT '0',
                CONSTRAINT "PK_e158176ecf713bb43a75f318924" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "book_entity"
            ADD "coverId" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "book_entity"
            ADD CONSTRAINT "UQ_60e5591087c07a305b86c2351f2" UNIQUE ("coverId")
        `);
    await queryRunner.query(`
            ALTER TABLE "book_entity"
            ADD CONSTRAINT "FK_60e5591087c07a305b86c2351f2" FOREIGN KEY ("coverId") REFERENCES "cover_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "book_entity" DROP CONSTRAINT "FK_60e5591087c07a305b86c2351f2"
        `);
    await queryRunner.query(`
            ALTER TABLE "book_entity" DROP CONSTRAINT "UQ_60e5591087c07a305b86c2351f2"
        `);
    await queryRunner.query(`
            ALTER TABLE "book_entity" DROP COLUMN "coverId"
        `);
    await queryRunner.query(`
            DROP TABLE "cover_entity"
        `);
  }
}
