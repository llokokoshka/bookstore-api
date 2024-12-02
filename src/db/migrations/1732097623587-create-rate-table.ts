import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRateTable1732097623587 implements MigrationInterface {
    name = 'CreateRateTable1732097623587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "rate_entity" (
                "id" SERIAL NOT NULL,
                "value" integer NOT NULL,
                "userId" integer,
                "bookId" integer,
                CONSTRAINT "PK_b76e740d646ae1a712d283c0b99" PRIMARY KEY ("id")
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "rate_entity" DROP CONSTRAINT "FK_b80e55a38addd737972b9afd890"
        `);
        await queryRunner.query(`
            ALTER TABLE "rate_entity" DROP CONSTRAINT "FK_82d060085d6072e094534ef7ed3"
        `);
        await queryRunner.query(`
            DROP TABLE "rate_entity"
        `);
    }

}
