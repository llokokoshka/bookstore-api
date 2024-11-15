import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDateOfIssueInBook1731676035765 implements MigrationInterface {
  name = 'AddDateOfIssueInBook1731676035765';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "book_entity"
            ADD "dateOfIssue" date NOT NULL DEFAULT '1800-01-01'
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "book_entity" DROP COLUMN "dateOfIssue"
        `);
  }
}
