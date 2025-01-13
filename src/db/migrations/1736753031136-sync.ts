import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1736753031136 implements MigrationInterface {
    name = 'Sync1736753031136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user_connetion_entity" (
                "id" SERIAL NOT NULL,
                "userSocketId" character varying NOT NULL,
                "connectedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_331c3f3f64118aa9e38b56f961f" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user_connetion_entity"
        `);
    }

}
