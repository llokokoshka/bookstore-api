import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteCoverTypeTable1731678224825 implements MigrationInterface {
  name = 'DeleteCoverTypeTable1731678224825';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "book_entity" DROP COLUMN "quantity"
        `);
    await queryRunner.query(`
            ALTER TABLE "cover_entity"
            ADD "quantity" integer NOT NULL
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."cover_entity_covertypes_enum" AS ENUM('Paperback', 'Hardcover')
        `);
    await queryRunner.query(`
            ALTER TABLE "cover_entity"
            ADD "coverTypes" "public"."cover_entity_covertypes_enum" NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "cover_entity" DROP COLUMN "coverTypes"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."cover_entity_covertypes_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "cover_entity" DROP COLUMN "quantity"
        `);
    await queryRunner.query(`
            ALTER TABLE "book_entity"
            ADD "quantity" integer NOT NULL
        `);
  }
}
