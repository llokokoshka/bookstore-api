import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCommentsTable1732006320205 implements MigrationInterface {
  name = 'CreateCommentsTable1732006320205';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "comments_entity" (
                "id" SERIAL NOT NULL,
                "text" character varying NOT NULL,
                "dateOfCreate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "userId" integer,
                "bookId" integer,
                CONSTRAINT "PK_27b6725d03ab49cab126157e999" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "comments_entity"
            ADD CONSTRAINT "FK_4d18b48a88029f2e6c4a6544f44" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "comments_entity"
            ADD CONSTRAINT "FK_156964ca8af3037a07f9c34fc53" FOREIGN KEY ("bookId") REFERENCES "book_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comments_entity" DROP CONSTRAINT "FK_156964ca8af3037a07f9c34fc53"
        `);
    await queryRunner.query(`
            ALTER TABLE "comments_entity" DROP CONSTRAINT "FK_4d18b48a88029f2e6c4a6544f44"
        `);
    await queryRunner.query(`
            DROP TABLE "comments_entity"
        `);
  }
}
