import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1731918663117 implements MigrationInterface {
  name = 'CreateUserTable1731918663117';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "user_entity"
        `);
  }
}
