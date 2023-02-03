import { MigrationInterface, QueryRunner } from "typeorm";

export class addedProjectCategoryTable1657200900126 implements MigrationInterface {
    name = 'addedProjectCategoryTable1657200900126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "project_category" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                CONSTRAINT "PK_826c5e0f45e35b5983c8379be7b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "project"
            ADD "projectCategoryId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "project"
            ADD CONSTRAINT "FK_63e100d6d811196f2240c262458" FOREIGN KEY ("projectCategoryId") REFERENCES "project_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "project" DROP CONSTRAINT "FK_63e100d6d811196f2240c262458"
        `);
        await queryRunner.query(`
            ALTER TABLE "project" DROP COLUMN "projectCategoryId"
        `);
        await queryRunner.query(`
            DROP TABLE "project_category"
        `);
    }

}
