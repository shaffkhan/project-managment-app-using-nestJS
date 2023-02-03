import { MigrationInterface, QueryRunner } from "typeorm";

export class addedClientTable1657196471456 implements MigrationInterface {
    name = 'addedClientTable1657196471456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "client" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "contactPerson" integer NOT NULL,
                "contactNumber" integer NOT NULL,
                "contactEmail" character varying NOT NULL,
                "address" character varying NOT NULL,
                CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "clientId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_56f28841fe433cf13f8685f9bc1" UNIQUE ("clientId")
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_56f28841fe433cf13f8685f9bc1" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_56f28841fe433cf13f8685f9bc1"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_56f28841fe433cf13f8685f9bc1"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "clientId"
        `);
        await queryRunner.query(`
            DROP TABLE "client"
        `);
    }

}
