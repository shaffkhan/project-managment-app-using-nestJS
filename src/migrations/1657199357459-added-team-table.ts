import { MigrationInterface, QueryRunner } from "typeorm";

export class addedTeamTable1657199357459 implements MigrationInterface {
    name = 'addedTeamTable1657199357459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "team" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD "teamId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD CONSTRAINT "FK_6f85d7f0e0f309a4ce2fc194bb9" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "profile" DROP CONSTRAINT "FK_6f85d7f0e0f309a4ce2fc194bb9"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP COLUMN "teamId"
        `);
        await queryRunner.query(`
            DROP TABLE "team"
        `);
    }

}
