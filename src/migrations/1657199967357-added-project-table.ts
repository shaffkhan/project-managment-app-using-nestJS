import { MigrationInterface, QueryRunner } from "typeorm";

export class addedProjectTable1657199967357 implements MigrationInterface {
    name = 'addedProjectTable1657199967357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "project" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "title" character varying NOT NULL,
                "duration" integer NOT NULL,
                "budget" integer NOT NULL,
                "category" character varying NOT NULL,
                "proposal" character varying NOT NULL,
                "feasibility" character varying NOT NULL,
                "isInHouse" boolean NOT NULL,
                "status" boolean NOT NULL,
                "clientId" integer,
                CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "project"
            ADD CONSTRAINT "FK_816f608a9acf4a4314c9e1e9c66" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "project" DROP CONSTRAINT "FK_816f608a9acf4a4314c9e1e9c66"
        `);
        await queryRunner.query(`
            DROP TABLE "project"
        `);
    }

}
