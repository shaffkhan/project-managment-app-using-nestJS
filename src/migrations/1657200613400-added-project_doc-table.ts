import { MigrationInterface, QueryRunner } from "typeorm";

export class addedProjectDocTable1657200613400 implements MigrationInterface {
    name = 'addedProjectDocTable1657200613400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "project_doc" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "version" integer NOT NULL,
                "author" character varying NOT NULL,
                "type" character varying NOT NULL,
                "projectId" integer,
                CONSTRAINT "PK_0028674d734f94ddf04c3446d33" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "project_doc"
            ADD CONSTRAINT "FK_2b3145838841e227fba04d31935" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "project_doc" DROP CONSTRAINT "FK_2b3145838841e227fba04d31935"
        `);
        await queryRunner.query(`
            DROP TABLE "project_doc"
        `);
    }

}
