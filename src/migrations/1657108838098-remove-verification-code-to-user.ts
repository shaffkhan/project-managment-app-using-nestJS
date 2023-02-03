import { MigrationInterface, QueryRunner } from "typeorm";

export class removeVerificationCodeToUser1657108838098 implements MigrationInterface {
    name = 'removeVerificationCodeToUser1657108838098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "verificationCode"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "verificationCode" character varying
        `);
    }

}
