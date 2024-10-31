import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1730383807286 implements MigrationInterface {
    name = 'Sync1730383807286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "avatar" character varying NOT NULL DEFAULT ''
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "avatar"
        `);
    }

}
