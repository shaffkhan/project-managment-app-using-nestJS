import { MigrationInterface, QueryRunner } from "typeorm";

export class addedDesignationTable1657190889624 implements MigrationInterface {
    name = 'addedDesignationTable1657190889624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "designation" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "responsibilities" character varying NOT NULL,
                CONSTRAINT "PK_8c84a3c335a852ff2d426cb0112" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD "designationId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD CONSTRAINT "FK_5d81e4d33e6d4b404a537e9dd97" FOREIGN KEY ("designationId") REFERENCES "designation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "profile" DROP CONSTRAINT "FK_5d81e4d33e6d4b404a537e9dd97"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP COLUMN "designationId"
        `);
        await queryRunner.query(`
            DROP TABLE "designation"
        `);
    }

}
