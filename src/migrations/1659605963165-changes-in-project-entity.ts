import { MigrationInterface, QueryRunner } from "typeorm";

export class changesInProjectEntity1659605963165 implements MigrationInterface {
    name = 'changesInProjectEntity1659605963165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "profile" DROP CONSTRAINT "FK_5d81e4d33e6d4b404a537e9dd97"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
                RENAME COLUMN "designation" TO "userId"
        `);
        await queryRunner.query(`
            CREATE TABLE "projectDocument" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "version" integer NOT NULL,
                "author" character varying NOT NULL,
                "type" character varying NOT NULL,
                "projectId" integer,
                CONSTRAINT "PK_059b8f102639861bb0542000970" PRIMARY KEY ("id")
            )
        `);
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
            CREATE TABLE "project" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "title" character varying NOT NULL,
                "duration" character varying NOT NULL,
                "budget" character varying NOT NULL,
                "category" character varying NOT NULL,
                "proposal" character varying NOT NULL,
                "feasibility" character varying NOT NULL,
                "isInHouse" boolean NOT NULL,
                "status" boolean NOT NULL,
                "clientId" integer,
                "projectCategoryId" integer,
                CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "task" (
                "id" SERIAL NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "title" character varying NOT NULL,
                "description" character varying NOT NULL,
                "asignee" character varying NOT NULL,
                "reporter" character varying NOT NULL,
                "priorty" integer NOT NULL,
                "estimatedDuration" integer NOT NULL,
                "status" boolean NOT NULL,
                "projectId" integer,
                "profileId" integer,
                CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "contactPerson"
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "contactNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "contactEmail"
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "address"
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "name" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "responsibilities" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "contactPerson" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "contactNumber" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "contactEmail" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "address" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD "userId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD CONSTRAINT "UQ_a24972ebd73b106250713dcddd9" UNIQUE ("userId")
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."user_role_enum"
            RENAME TO "user_role_enum_old"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'staff', 'client', 'profile')
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "role" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "role" TYPE "public"."user_role_enum" USING "role"::"text"::"public"."user_role_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "role"
            SET DEFAULT 'staff'
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_role_enum_old"
        `);
        await queryRunner.query(`
            ALTER TABLE "projectDocument"
            ADD CONSTRAINT "FK_3453a51e933836c1029e712c79b" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "project"
            ADD CONSTRAINT "FK_816f608a9acf4a4314c9e1e9c66" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "project"
            ADD CONSTRAINT "FK_63e100d6d811196f2240c262458" FOREIGN KEY ("projectCategoryId") REFERENCES "project_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_7220f8489e005808ed7d8740bb6" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD CONSTRAINT "FK_5d81e4d33e6d4b404a537e9dd97" FOREIGN KEY ("designationId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "profile" DROP CONSTRAINT "FK_5d81e4d33e6d4b404a537e9dd97"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP CONSTRAINT "FK_a24972ebd73b106250713dcddd9"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_7220f8489e005808ed7d8740bb6"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"
        `);
        await queryRunner.query(`
            ALTER TABLE "project" DROP CONSTRAINT "FK_63e100d6d811196f2240c262458"
        `);
        await queryRunner.query(`
            ALTER TABLE "project" DROP CONSTRAINT "FK_816f608a9acf4a4314c9e1e9c66"
        `);
        await queryRunner.query(`
            ALTER TABLE "projectDocument" DROP CONSTRAINT "FK_3453a51e933836c1029e712c79b"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."user_role_enum_old" AS ENUM('admin', 'staff', 'client')
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "role" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "role" TYPE "public"."user_role_enum_old" USING "role"::"text"::"public"."user_role_enum_old"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "role"
            SET DEFAULT 'staff'
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_role_enum"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."user_role_enum_old"
            RENAME TO "user_role_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP CONSTRAINT "UQ_a24972ebd73b106250713dcddd9"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD "userId" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "address"
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "contactEmail"
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "contactNumber"
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "contactPerson"
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "responsibilities"
        `);
        await queryRunner.query(`
            ALTER TABLE "client" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "address" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "contactEmail" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "contactNumber" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "client"
            ADD "contactPerson" integer NOT NULL
        `);
        await queryRunner.query(`
            DROP TABLE "task"
        `);
        await queryRunner.query(`
            DROP TABLE "project"
        `);
        await queryRunner.query(`
            DROP TABLE "project_category"
        `);
        await queryRunner.query(`
            DROP TABLE "projectDocument"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
                RENAME COLUMN "userId" TO "designation"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD CONSTRAINT "FK_5d81e4d33e6d4b404a537e9dd97" FOREIGN KEY ("designationId") REFERENCES "designation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
