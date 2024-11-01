import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1730446406262 implements MigrationInterface {
    name = 'Sync1730446406262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "avatar" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "avatar" DROP DEFAULT
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "avatar"
            SET DEFAULT ''
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "avatar"
            SET NOT NULL
        `);
    }

}
